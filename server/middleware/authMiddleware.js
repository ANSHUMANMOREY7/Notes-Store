const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");
const AllowedStaff = require("../models/AllowedStaff");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check authorization header
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.slice(7);

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] }
    );

    // Find verified staff account
    const staff = await Staff.findOne({
      _id: decoded.staffId,
      isVerified: true,
    });

    if (!staff) {
      return res.status(403).json({
        message: "Staff account not authorized",
      });
    }

    // Check that staff is still approved
    const allowed = await AllowedStaff.findOne({
      email: staff.email,
      registered: true,
    });

    if (!allowed) {
      return res.status(403).json({
        message: "Staff access has been revoked",
      });
    }
    // Prevent old sessions from becoming valid after reauthorization
if (decoded.approvalId !== allowed._id.toString()) {
  return res.status(401).json({
    message: "Session expired. Please log in again.",
  });
}
    // Attach staff information to request
    req.staff = {
      id: staff._id,
      name: staff.name,
      email: staff.email,
    };

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
};

module.exports = authMiddleware;
