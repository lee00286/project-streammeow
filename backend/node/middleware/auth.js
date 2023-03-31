export const isAuthenticated = function (req, res, next) {
  if (!req.session.userId)
    return res.status(401).json({ error: "Not Authenticated" });
  next();
};

export const isNotAuthenticated = function (req, res, next) {
  if (req.session.userId)
    return res.status(200).json({ userId: req.session.userId });
  next();
};
