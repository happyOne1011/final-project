export function authorizeRoles(...allowedRoles) {
  return function (req, res, next) {
    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error('Forbidden: insufficient permission');
      error.status = 403;
      return next(error);
    }
    return next();
  };
}
