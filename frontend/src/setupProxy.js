const { createProxyMiddleware } = require("http-proxy-middleware");
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5001;

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://${HOST}:${PORT}`,
      changeOrigin: true,
    })
  );
};
