'use strict';

const path = require('path');
const fs = require('fs');

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

const getPublicUrl = appPackageJson =>
    envPublicUrl || require(appPackageJson).homepage;

function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl =
        envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
}

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appIndexJs: resolveApp('src/index.js'),
    appBuildDev: resolveApp('public/dev'),
    appBuildProd: resolveApp('public/prod'),
    appSrc: resolveApp('src'),
    appHtml: resolveApp('src/sources/index.html'),
    serverIndexJs: resolveApp('server/index.js'),
    appPublic: resolveApp('public/server'),
    servedPath: getServedPath(resolveApp('package.json')),


    appBuild: resolveApp('public'),
    appServer: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    appPackageJson: resolveApp('package.json'),
    devServerContentBase: resolveApp('build'),
    dotenv: resolveApp('.env'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveApp('src/setupTests.js'),
    // publicUrl: getPublicUrl(resolveApp('package.json')),
};
