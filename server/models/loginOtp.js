const mongoose = require("mongoose");

const loginOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  otpHash: {
    type: String,
    required: true,
    select: false,
  },

  expiresAt: {
    type: Date,
    required: true,
  },

  attempts: {
    type: Number,
    default: 0,
  },

  lastOtpSentAt: {
    type: Date,
    default: null,
  },
});

// Automatically remove expired OTP records
loginOtpSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

module.exports = mongoose.model("LoginOtp", loginOtpSchema);
