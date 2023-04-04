import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

export const isAuthenticated = function (req, res, next) {
  if (!req.session.userId || !checkJwt)
    return res.status(401).json({ error: "Not Authenticated" });
  next();
};

export const isNotAuthenticated = function (req, res, next) {
  if (req.session.userId)
    return res.status(200).json({ userId: req.session.userId });
  if (checkJwt) return res.status(200).json({ message: "signed in by auth0" });
  next();
};

// Auth0 Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
  audience: "https://streamoew-backend/api",
  issuerBaseURL: "https://dev-xz5orhy8rzrhzt80.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// Example use case for above moddleware.
// This route doesn't need authentication
// app.get("/api/public", function (req, res) {
//   res.json({
//     message:
//       "Hello from a public endpoint! You don't need to be authenticated to see this.",
//   });
// });

// // This route needs authentication
// app.get("/api/private", checkJwt, function (req, res) {
//   res.json({
//     message:
//       "Hello from a private endpoint! You need to be authenticated to see this.",
//   });
// });

// const checkScopes = requiredScopes("read:messages");

// app.get("/api/private-scoped", checkJwt, checkScopes, function (req, res) {
//   res.json({
//     message:
//       "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
//   });
// });
