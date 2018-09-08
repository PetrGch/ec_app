const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const paths = require('./util/paths');

process.env.NODE_PATH = (process.env.NODE_PATH || '');

module.exports = {
  entry: paths.serverIndexJs,

  output: {
    path: paths.appPublic,
    filename: 'serverBundle.js'
  },

  target: 'node',

  externals: [nodeExternals()],

  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true
                }
              },

            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[ext]',
            },
          }
        ]
      }
    ]
  },

  node: {
    __filename: false,
    __dirname: false
  },

  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    })
  ]
};