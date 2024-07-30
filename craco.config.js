const CopyWebpackPlugin = require('copy-webpack-plugin');
const CracoAlias = require('craco-alias');
const path = require('path');

const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const { podeSalvarLogsNoSentry } = require('./src/sentryConfig');

const ehLocal =
  process.env.REACT_APP_ENV === 'local' ||
  process.env.NODE_ENV.toString().includes('development');

const copyWebpackConfig = {
  patterns: [
    {
      from: `./src/sw/fcm${ehLocal ? 'Local' : ''}.js`,
      to: 'firebase-messaging-sw.js',
      transform(content) {
        let parsed = content.toString();
        const transformation = [
          {
            search: 'process.env.REACT_APP_API_KEY',
            replace: `"${process.env.REACT_APP_API_KEY}"`,
          },
          {
            search: 'process.env.REACT_APP_AUTH_DOMAIN',
            replace: `"${process.env.REACT_APP_AUTH_DOMAIN}"`,
          },
          {
            search: 'process.env.REACT_APP_DATABASE_URL',
            replace: `"${process.env.REACT_APP_DATABASE_URL}"`,
          },
          {
            search: 'process.env.REACT_APP_PROJECT_ID',
            replace: `"${process.env.REACT_APP_PROJECT_ID}"`,
          },
          {
            search: 'process.env.REACT_APP_STORAGE_BUCKET',
            replace: `"${process.env.REACT_APP_STORAGE_BUCKET}"`,
          },
          {
            search: 'process.env.REACT_APP_MESSAGING_SENDER_ID',
            replace: `"${process.env.REACT_APP_MESSAGING_SENDER_ID}"`,
          },
          {
            search: 'process.env.REACT_APP_ID',
            replace: `"${process.env.REACT_APP_ID}"`,
          },
        ];
        for (let i = 0; i < transformation.length; i++) {
          parsed = parsed.replace(
            transformation[i].search,
            transformation[i].replace,
          );
        }
        return Buffer.from(parsed, 'utf8');
      },
    },
  ],
};

const plugins = [new CopyWebpackPlugin(copyWebpackConfig)];

if (podeSalvarLogsNoSentry() && process.env.REACT_APP_SENTRY_AUTH_TOKEN) {
  const SentryPlugin = new SentryWebpackPlugin({
    // sentry-cli configuration
    authToken: process.env.REACT_APP_SENTRY_AUTH_TOKEN,
    org: 'credito-express',
    project: 'ce-react',

    // webpack specific configuration
    include: '.',
    ignore: ['node_modules', 'webpack.config.js'],
  });

  plugins.push(SentryPlugin);
}

module.exports = {
  reactScriptsVersion: 'react-scripts',
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        baseUrl: './src',
        source: 'jsconfig',
      },
    },
  ],
  webpack: {
    alias: {
      '~/app': path.resolve(__dirname, 'src'),
      '~/pages': path.resolve(__dirname, 'src/pages'),
      '~/containers': path.resolve(__dirname, 'src/containers'),
      '~/components': path.resolve(__dirname, 'src/components'),
      '~/providers': path.resolve(__dirname, 'src/providers'),
      '~/common': path.resolve(__dirname, 'src/common'),
      '~/resources': path.resolve(__dirname, 'src/common/resources'),
    },
    jest: {
      configure: {
        moduleNameMapper: {
          '^~(.*)$': '<rootDir>/src$1',
        },
      },
    },
    plugins,
    configure: webpackConfig => {
      return webpackConfig;
    },
  },
};
