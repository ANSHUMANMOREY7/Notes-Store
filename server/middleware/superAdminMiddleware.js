const superAdminMiddleware = (req, res, next) => {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL
    ?.trim()
    .toLowerCase();

  if (
    !superAdminEmail ||
    !req.staff?.email ||
    req.staff.email.toLowerCase() !== superAdminEmail
  ) {
    return res.status(403).json({
      message: "Super Admin access denied",
    });
  }

  next();
};

module.exports = superAdminMiddleware;