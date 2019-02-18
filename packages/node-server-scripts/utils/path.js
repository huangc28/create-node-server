'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())

// @todo '..' should be removed since this script will be
// executed by the application but not the package
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const appPaths = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  distPath: resolveApp('dist'),
  nodeModulePath: resolveApp('node_modules'),
  nodeModuleBinPath: resolveApp('node_modules/.bin'),
  packageJsonPath: resolveApp('package.json'),
}

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)
const ownPaths = {
  ownPath: resolveOwn('.'),
  configPath: resolveOwn('config'),
  babelConfig: resolveOwn('config/.babelrc'),
  webpackConfig: resolveOwn('config/webpack.config.js'),
  packageJsonPath: resolveOwn('package.json'),
}

module.exports = {
  appPaths,
  ownPaths,
}



