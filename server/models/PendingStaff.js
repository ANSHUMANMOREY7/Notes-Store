const mongoose = require("mongoose");

const pendingStaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  passwordHash: {
    type: String,
    required: true,
    select: false,
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically delete expired registrations
pendingStaffSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

module.exports = mongoose.model(
  "PendingStaff",
  pendingStaffSchema
);
