const {
  createProxyMiddleware,
} = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/assets", {
      target: "http://localhost:80",
      changeOrigin: true,
    })
  );
};
