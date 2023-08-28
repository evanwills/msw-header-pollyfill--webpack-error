const path = require('path');

/**
 * Whether or not this script is being run in dev mode.
 *
 * @var {boolean} isDev
 */
const isDev = (process.env.NODE_ENV === 'development');

/**
 * Vue config (for all environments)
 *
 * @var {object} config
 */
const config = {
  configureWebpack: {
    devtool: (isDev === true) ? 'eval' : 'source-map',
    module: {
      rules: [
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        },
      ],
    },
    performance: {
      hints: (isDev === true) ? 'warning' : 'error',
      maxEntrypointSize: 1572864,
      maxAssetSize: 1048576,
    },
  },

  devServer: {
    // public: 'http://cm.smithfamily.localhost:8080',
    disableHostCheck: true,
  },
  filenameHashing: false,
  productionSourceMap: isDev,
  runtimeCompiler: true,
};

if (isDev === true) {
  // Add addtional configuration for development environment.

  /**
   * If in development mode, the following pages will be included in
   * the build step.
   *
   * > __Note:__ Add any new page URLs here
   *
   * @property {object} pages
   */
  config.pages = {
    'my-details': 'src/main.js',
  };
} else {
  config.configureWebpack.module.rules.push(
    {
      test: /\.js$/i,
      exclude: [
        path.resolve(__dirname, 'src/mocks/'),
        path.resolve(__dirname, 'src/mock-data/'),
      ],
    },
  );
}

module.exports = config;
