const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const paths = require('./util/paths');

process.env.NODE_PATH = (process.env.NODE_PATH || '');
process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: paths.appIndexJs,

  output: {
    pathinfo: true,
    path: paths.appBuildDev,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/'
  },

  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
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
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            exclude: /node_modules/,
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
            test: /\.less$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('less-loader'),
                options: {
                  javascriptEnabled: true
                },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      title: 'Excurrate',
      PUBLIC_URL: ''
    }),
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
      NODE_ENV: JSON.stringify('development')
    }),
    //
    // Analyzer
    //
    // new BundleAnalyzerPlugin({
    //     analyzerPort: 8888
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },

  performance: {
    hints: false,
  },

  devServer: {
    contentBase: paths.devServerContentBase,
    proxy: {},
    compress: true,
    port: 9000,
  },
};