const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const superAdminMiddleware = require("../middleware/superAdminMiddleware");

const {
  getFaculty,
  authorizeFaculty,
  revokeFaculty,
} = require("../controllers/superAdminController");

// Protect all Super Admin routes
router.use(authMiddleware);
router.use(superAdminMiddleware);

// Get authorized faculty
router.get("/faculty", getFaculty);

// Authorize new faculty
router.post("/faculty", authorizeFaculty);

// Revoke faculty access
router.delete("/faculty/:id", revokeFaculty);

module.exports = router;