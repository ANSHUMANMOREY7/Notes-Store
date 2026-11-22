const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Staff = require("../models/Staff");
const AllowedStaff = require("../models/AllowedStaff");
const transporter = require("../config/mail");

// Temporary OTP storage.
// We'll replace this with MongoDB storage before deployment.
const pendingRegistrations = new Map();

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

    // Generate a secure 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    const passwordHash = await bcrypt.hash(password, 12);
    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    pendingRegistrations.set(normalizedEmail, {
      name: name.trim(),
      passwordHash,
      otpHash,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0,
    });

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

module.exports = { registerStaff };
