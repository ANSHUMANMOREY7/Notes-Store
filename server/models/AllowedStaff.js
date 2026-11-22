const mongoose = require("mongoose");

const allowedStaffSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    registered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "AllowedStaff",
  allowedStaffSchema,
  "approvedstaffs"
);
