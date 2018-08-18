'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_PATH = (process.env.NODE_PATH || '');

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./util/paths');

const publicPath = '/';

module.exports = {
    entry: [
        paths.serverIndexJs
    ],
    output: {
        pathinfo: true,
        path: paths.appPublic,
        filename: 'server.js',
        publicPath: publicPath
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
    target: 'node',
    externals: fs.readdirSync('node_modules')
        .reduce(function(acc, mod) {
            if (mod === '.bin') {
                return acc;
            }

            acc[mod] = 'commonjs ' + mod;
            return acc;
        }, {}),
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            presets: ['env', 'react', 'es2017'],
                            cacheDirectory: true,
                        },
                    }
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
