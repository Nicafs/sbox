/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  if (
    process.env.REACT_APP_ENV === 'local' ||
    process.env.REACT_APP_PROXY_LOCAL
  ) {
    app.use(
      createProxyMiddleware('/api/auth', { target: 'http://localhost:8000/' }),
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
      createProxyMiddleware('/api/atualizarDadosPessoa', {
        target: `${process.env.REACT_APP_FUNCTIONS_BASE_URL}/atualizar_dados_pessoa`,
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
