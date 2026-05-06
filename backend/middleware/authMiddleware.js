
export const protect = (req, res, next) => {
  // simple version (since you're not using JWT yet)
  const user = req.body.user || req.user;

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  req.user = user;
  next();
};

// 🔥 ROLE CHECK
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};