const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const PendingStaff = require("../models/PendingStaff");
const Staff = require("../models/Staff");
const AllowedStaff = require("../models/AllowedStaff");
const transporter = require("../config/mail");

const registerStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 12
    ) {
      return res.status(400).json({
        message: "Enter a name, email and password of at least 12 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check whether the email is approved
    const allowed = await AllowedStaff.findOne({
      email: normalizedEmail,
    });

    if (!allowed) {
      return res.status(403).json({
        message: "This email is not approved for staff registration",
      });
    }

    // Prevent duplicate accounts
    const existingStaff = await Staff.findOne({
      email: normalizedEmail,
    });

    if (existingStaff) {
      return res.status(409).json({
        message: "This staff account already exists",
      });
    }
    const pendingStaff = await PendingStaff.findOne({
        
  email: normalizedEmail,
});
if (
  pendingStaff &&
  pendingStaff.attempts >= 5 &&
  pendingStaff.expiresAt.getTime() > Date.now()
) {
  return res.status(429).json({
    message: "Too many incorrect attempts. Try again after the OTP expires",
  });
}

if (
  pendingStaff?.lastOtpSentAt &&
  Date.now() - pendingStaff.lastOtpSentAt.getTime() < 60 * 1000
) {
  return res.status(429).json({
    message: "Please wait 60 seconds before requesting another OTP",
  });
}
    // Generate a secure 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    const passwordHash = await bcrypt.hash(password, 12);
    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

   await PendingStaff.findOneAndUpdate(
  { email: normalizedEmail },
  {
    $set: {
      name: name.trim(),
      passwordHash,
      otpHash,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      attempts: 0,
      lastOtpSentAt: new Date(),
    },
  },
  {
    upsert: true,
    returnDocument: "after",
    runValidators: true,
  }
);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: normalizedEmail,
      subject: "Notes Store - Verify Your Email",
      text: `Your Notes Store verification code is ${otp}. It expires in 10 minutes. If you didn't request this, ignore this email.`,
    });

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
    }).select("+passwordHash +otpHash");

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
            password: pending.passwordHash,
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


module.exports = {
  registerStaff,
  verifyStaffOtp,
};
