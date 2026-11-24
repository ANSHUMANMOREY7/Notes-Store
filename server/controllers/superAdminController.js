const AllowedStaff = require("../models/AllowedStaff");
const Staff = require("../models/Staff");
// Get all authorized faculty
exports.getFaculty = async (req, res) => {
  try {
    const faculty = await AllowedStaff.find()
      .sort({ createdAt: -1 });

    res.status(200).json(faculty);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch faculty",
    });
  }
};

// Authorize new faculty
exports.authorizeFaculty = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    // Check if email is provided
if (!email) {
  return res.status(400).json({
    message: "Email is required",
  });
}

// Validate email format
// Check email format
const parts = email.split("@");

if (
  parts.length !== 2 ||
  parts[0] === "" ||
  !parts[1].includes(".") ||
  parts[1].startsWith(".") ||
  parts[1].endsWith(".") ||
  email.includes(" ")
) {
  return res.status(400).json({
    message: "Invalid email format",
  });
}


    const existing = await AllowedStaff.findOne({ email });

    if (existing) {
      return res.status(409).json({
        message: "Faculty email is already authorized",
      });
    }

    // Check if faculty has already registered
const existingStaff = await Staff.findOne({
  email,
  isVerified: true,
});

// Authorize faculty email
const faculty = await AllowedStaff.create({
  email,
  registered: existingStaff ? true : false,
});

    res.status(201).json({
      message: "Faculty authorized successfully",
      faculty,
    });

  } catch (error) {
    console.error("Authorize faculty error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Faculty email is already authorized",
      });
    }

    res.status(500).json({
      message: "Failed to authorize faculty",
    });
  }
};

// Revoke faculty access
exports.revokeFaculty = async (req, res) => {
  try {
    const faculty = await AllowedStaff.findById(
      req.params.id
    );

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    // Prevent Super Admin from revoking own access
    if (
      faculty.email ===
      process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase()
    ) {
      return res.status(403).json({
        message: "Cannot revoke Super Admin access",
      });
    }

    await faculty.deleteOne();

    res.status(200).json({
      message: "Faculty access revoked successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to revoke faculty access",
    });
  }
};