const { requiresAuth } = require("express-openid-connect");

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

export const isAuthenticated = function (req, res, next) {
  if (!req.session.user)
    return res.status(401).json({ error: "Not Authenticated" });
  next();
};
