const mongoose = require("mongoose");
const crypto = require("crypto");
const PendingStaff = require("../models/PendingStaff");
const Staff = require("../models/Staff");
const AllowedStaff = require("../models/AllowedStaff");
const jwt = require("jsonwebtoken");
const LoginOtp = require('../models/loginOtp');

const registerStaff = async (req, res) => {
  try {
    const { name, email } = req.body || {};

    if (
  typeof name !== "string" ||
  typeof email !== "string" ||
  !name.trim() ||
  !email.trim()
) {
      return res.status(400).json({
        message: "Enter a valid name and email",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check approved email
    const allowed = await AllowedStaff.findOne({
      email: normalizedEmail,
      registered: false,
    });

    if (!allowed) {
      return res.status(403).json({
        message: "Email is not approved or already registered",
      });
    }

    // Prevent duplicate accounts
    const existingStaff = await Staff.findOne({
      email: normalizedEmail,
    });

    if (existingStaff) {
      return res.status(409).json({
        message: "Staff account already exists",
      });
    }

    const now = new Date();

    // Generate OTP and hash sensitive information
    const otp = crypto.randomInt(100000, 1000000).toString();

    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Atomically claim permission to send an OTP
    const pending = await PendingStaff.findOneAndUpdate(
      {
        email: normalizedEmail,
        $or: [
          {
            expiresAt: { $lte: now },
          },
          {
            attempts: { $lt: 5 },
            lastOtpSentAt: {
              $lte: new Date(now.getTime() - 60 * 1000),
            },
          },
        ],
      },
      {
        $set: {
          name: name.trim(),
          otpHash,
          expiresAt: new Date(now.getTime() + 10 * 60 * 1000),
          attempts: 0,
          lastOtpSentAt: now,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!pending) {
      // Insert only if no pending registration exists
      const existingPending = await PendingStaff.exists({
        email: normalizedEmail,
      });

      if (existingPending) {
        return res.status(429).json({
          message: "Please wait before requesting another OTP",
        });
      }

      try {
        await PendingStaff.create({
          name: name.trim(),
          email: normalizedEmail,
          otpHash,
          expiresAt: new Date(now.getTime() + 10 * 60 * 1000),
          attempts: 0,
          lastOtpSentAt: now,
        });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(429).json({
            message: "Please wait before requesting another OTP",
          });
        }
        throw error;
      }
    }

    // Send OTP to approved staff email
    const emailResponse = await fetch(
  "https://api.brevo.com/v3/smtp/email",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [
        {
          email: normalizedEmail,
        },
      ],
      subject: "Notes Store - Verify Your Email",
      textContent: `Your Notes Store verification code is ${otp}. It expires in 10 minutes. If you didn't request this, ignore this email.`,
    }),
  }
);

if (!emailResponse.ok) {
  const errorData = await emailResponse.text();
  console.error("Brevo email error:", emailResponse.status, errorData);
  throw new Error("Failed to send verification email");
}

    return res.status(200).json({
      message: "Verification code sent to your email",
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};


const verifyStaffOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (
      typeof email !== "string" ||
      typeof otp !== "string" ||
      !/^\d{6}$/.test(otp)
    ) {
      return res.status(400).json({
        message: "Enter a valid email and 6-digit OTP",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find the pending registration
    const pendingStaff = await PendingStaff.findOne({
  email: normalizedEmail,
}).select("+otpHash");

    if (!pendingStaff) {
      return res.status(400).json({
        message: "Registration not found or expired",
      });
    }

    // Check OTP expiration
    if (pendingStaff.expiresAt.getTime() <= Date.now()) {
      await PendingStaff.deleteOne({ _id: pendingStaff._id });

      return res.status(400).json({
        message: "OTP expired. Please register again",
      });
    }

    // Allow a maximum of 5 incorrect attempts
    if (pendingStaff.attempts >= 5) {
      return res.status(429).json({
        message: "Too many incorrect attempts. Request a new OTP",
      });
    }

    // Hash the submitted OTP
    const submittedOtpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const isValidOtp = crypto.timingSafeEqual(
      Buffer.from(submittedOtpHash, "hex"),
      Buffer.from(pendingStaff.otpHash, "hex")
    );

    
if (!isValidOtp) {
  const result = await PendingStaff.updateOne(
    {
      _id: pendingStaff._id,
      attempts: { $lt: 5 },
      expiresAt: { $gt: new Date() },
    },
    {
      $inc: { attempts: 1 },
    }
  );

  if (result.modifiedCount === 0) {
    return res.status(429).json({
      message: "OTP expired or too many attempts",
    });
  }

  return res.status(400).json({
    message: "Incorrect OTP",
  });
}


const claimedRegistration = await PendingStaff.findOne({
  _id: pendingStaff._id,
  otpHash: submittedOtpHash,
  attempts: { $lt: 5 },
  expiresAt: { $gt: new Date() },
});

if (!claimedRegistration) {
  return res.status(400).json({
    message: "OTP expired, already used, or too many attempts",
  });
}

if (!claimedRegistration) {
  return res.status(400).json({
    message: "OTP expired, already used, or too many attempts",
  });
}

  
    // Complete staff registration using MongoDB transaction
    await mongoose.connection.transaction(async (session) => {

      // Check and remove the pending registration
const pending = await PendingStaff.findOneAndDelete({
  _id: pendingStaff._id,
  otpHash: submittedOtpHash,
  attempts: { $lt: 5 },
  expiresAt: { $gt: new Date() },
}).session(session);

      if (!pending) {
        throw new Error("INVALID_REGISTRATION");
      }

      // Confirm the email is approved
      const allowed = await AllowedStaff.findOneAndUpdate(
        {
          email: normalizedEmail,
          registered: false,
        },
        {
          $set: { registered: true },
        },
        {
          session,
          returnDocument: "after",
        }
      );

      if (!allowed) {
        throw new Error("NOT_APPROVED");
      }

      // Create the permanent verified staff account
     await Staff.create(
  [
    {
      name: pending.name,
      email: normalizedEmail,
      isVerified: true,
    },
  ],
  { session }
);
    });

    return res.status(201).json({
      message: "Email verified. Staff account created successfully",
    });

  
  } catch (error) {
    if (error.message === "INVALID_REGISTRATION") {
      return res.status(400).json({
        message: "OTP expired, already used, or too many attempts",
      });
    }

    if (error.message === "NOT_APPROVED") {
      return res.status(403).json({
        message: "Email not approved or already registered",
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Staff account already exists",
      });
    }

    console.error("OTP verification error:", error);

    return res.status(500).json({
      message: "Email verification failed",
    });
  }
};

const requestLoginOtp = async (req, res) => {
  try {
    const { email } = req.body || {};

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        message: "Enter a valid email",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check whether staff is registered and verified
    const staff = await Staff.findOne({
      email: normalizedEmail,
      isVerified: true,
    });

    // Check whether staff is still approved
    const allowed = await AllowedStaff.findOne({
      email: normalizedEmail,
      registered: true,
    });

    if (!staff || !allowed) {
      return res.status(403).json({
        message: "Email is not registered or approved",
      });
    }

    const now = new Date();

    // Generate a secure 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Save OTP, allowing a new one after 60 seconds
    const existingOtp = await LoginOtp.findOneAndUpdate(
      {
        email: normalizedEmail,
        $or: [
          { expiresAt: { $lte: now } },
          {
            attempts: { $lt: 5 },
            lastOtpSentAt: {
              $lte: new Date(now.getTime() - 60 * 1000),
            },
          },
        ],
      },
      {
        $set: {
          otpHash,
          expiresAt: new Date(now.getTime() + 10 * 60 * 1000),
          attempts: 0,
          lastOtpSentAt: now,
        },
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!existingOtp) {
      const alreadyPending = await LoginOtp.exists({
        email: normalizedEmail,
      });

      if (alreadyPending) {
        return res.status(429).json({
          message: "Please wait before requesting another OTP",
        });
      }

      try {
        await LoginOtp.create({
          email: normalizedEmail,
          otpHash,
          expiresAt: new Date(now.getTime() + 10 * 60 * 1000),
          attempts: 0,
          lastOtpSentAt: now,
        });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(429).json({
            message: "Please wait before requesting another OTP",
          });
        }
        throw error;
      }
    }

    // Send OTP to registered staff email
   
// Send Login OTP using Brevo HTTPS API
const emailResponse = await fetch(
  "https://api.brevo.com/v3/smtp/email",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: normalizedEmail }],
      subject: "Notes Store - Login OTP",
      textContent: `Your Notes Store login OTP is ${otp}. It expires in 10 minutes. If you didn't request this, ignore this email.`,
    }),
  }
);

if (!emailResponse.ok) {
  const errorData = await emailResponse.text();

  console.error(
    "Brevo login OTP error:",
    emailResponse.status,
    errorData
  );

  throw new Error("Failed to send login OTP");
}


    return res.status(200).json({
      message: "Login OTP sent to your email",
    });
  } catch (error) {
    console.error("Login OTP error:", error);

    return res.status(500).json({
      message: "Failed to send login OTP",
    });
  }
};


const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body || {};

    // Validate email and OTP
    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof otp !== "string" ||
      !/^\d{6}$/.test(otp)
    ) {
      return res.status(400).json({
        message: "Enter a valid email and 6-digit OTP",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find the saved login OTP
    const loginOtp = await LoginOtp.findOne({
      email: normalizedEmail,
    }).select("+otpHash");

    if (!loginOtp) {
      return res.status(400).json({
        message: "OTP not found or expired",
      });
    }

    // Check expiration
    if (loginOtp.expiresAt.getTime() <= Date.now()) {
      await LoginOtp.deleteOne({ _id: loginOtp._id });

      return res.status(400).json({
        message: "OTP expired. Request a new one",
      });
    }

    // Maximum 5 incorrect attempts
    if (loginOtp.attempts >= 5) {
      return res.status(429).json({
        message: "Too many attempts. Request a new OTP",
      });
    }

    // Hash the entered OTP
    const submittedOtpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Compare hashes
    const isValidOtp = crypto.timingSafeEqual(
      Buffer.from(submittedOtpHash, "hex"),
      Buffer.from(loginOtp.otpHash, "hex")
    );

    if (!isValidOtp) {
      await LoginOtp.updateOne(
        {
          _id: loginOtp._id,
          attempts: { $lt: 5 },
          expiresAt: { $gt: new Date() },
        },
        { $inc: { attempts: 1 } }
      );

      return res.status(400).json({
        message: "Incorrect OTP",
      });
    }

    // Consume the OTP so it cannot be reused
    const usedOtp = await LoginOtp.findOneAndDelete({
      _id: loginOtp._id,
      otpHash: submittedOtpHash,
      attempts: { $lt: 5 },
      expiresAt: { $gt: new Date() },
    });

    if (!usedOtp) {
      return res.status(400).json({
        message: "OTP expired or already used",
      });
    }

    // Confirm that the staff account is verified
    const staff = await Staff.findOne({
      email: normalizedEmail,
      isVerified: true,
    });

    // Confirm that the email is still approved
    const allowed = await AllowedStaff.findOne({
      email: normalizedEmail,
      registered: true,
    });

    if (!staff || !allowed) {
      return res.status(403).json({
        message: "Staff account is not authorized",
      });
    }

    // Generate JWT valid for 8 hours
   const token = jwt.sign(
  {
    staffId: staff._id.toString(),
    approvalId: allowed._id.toString(),
  },
  process.env.JWT_SECRET,
  {
    algorithm: "HS256",
    expiresIn: "8h",
  }
);

    return res.status(200).json({
      message: "Login successful",
      token,
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
      },
    });
  } catch (error) {
    console.error("Login OTP verification error:", error);

    return res.status(500).json({
      message: "Login verification failed",
    });
  }
};


module.exports = {
  registerStaff,
  verifyStaffOtp,
  requestLoginOtp,
  verifyLoginOtp,
};
