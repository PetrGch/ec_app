const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./util/paths');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
process.env.NODE_PATH = (process.env.NODE_PATH || '');
process.env.NODE_ENV = 'development';

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const shouldUseRelativeAssetPaths = publicPath === './';
const cssFilename = 'static/css/[name].[contenthash:8].css';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
  {publicPath: Array(cssFilename.split('/').length).join('../')}
  : {};

module.exports = {
  bail: true,

  devtool: shouldUseSourceMap ? 'source-map' : false,

  entry: paths.appIndexJs,

  output: {
    pathinfo: true,
    path: paths.appBuildProd,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
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
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
            },
          },
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false,
                    },
                  },
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
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
                extractTextPluginOptions
              )
            ),
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
      filename: 'indexRoot.html',
      title: 'Compare foreign currency rates | ExCurRate',
      PUBLIC_URL: '',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
      NODE_ENV: JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: shouldUseSourceMap,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
      },
      minify: true,
      navigateFallback: publicUrl + '/indexRoot.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),

    // new BundleAnalyzerPlugin({
    //     analyzerPort: 8888
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin()
  ],
};