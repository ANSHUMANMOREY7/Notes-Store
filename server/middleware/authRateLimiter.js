const rateLimit = require("express-rate-limit");

// Limit staff registration requests
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many registration requests. Try again in 15 minutes.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many login requests. Try again in 15 minutes.",
  },
});

// Limit OTP verification requests
const verifyOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many verification requests. Try again in 15 minutes.",
  },
});

module.exports = {
  registerLimiter,
  loginLimiter,
  verifyOtpLimiter,
};
