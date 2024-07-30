const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  if (
    process.env.REACT_APP_ENV === 'local' ||
    process.env.REACT_APP_PROXY_LOCAL
  ) {
    app.use(
      createProxyMiddleware('/api/auth', { target: 'http://localhost:8000/' }),
    );
    app.use(
      createProxyMiddleware('/api/integracao', {
        target: 'http://localhost:8081/',
      }),
    );
    app.use(
      createProxyMiddleware('/api', { target: 'http://localhost:8080/' }),
    );
  }
  if (['dev', 'staging'].includes(process.env.REACT_APP_ENV)) {
    app.use(
      createProxyMiddleware('/api/auth', {
        target: `${process.env.REACT_APP_FUNCTIONS_BASE_URL}/auth-api`,
        changeOrigin: true,
      }),
    );
    app.use(
      createProxyMiddleware('/api/integracao', {
        target: process.env.REACT_APP_API_INTEGRACAO_URL,
        changeOrigin: true,
      }),
    );
    app.use(
      createProxyMiddleware('/api', {
        target: process.env.REACT_APP_API_URL,
        changeOrigin: true,
      }),
    );
  }
};
