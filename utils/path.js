'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
// @todo '..' should be removed since this script will be
// executed by the application but not the package
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const appPaths = {
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  distPath: resolveApp('dist'),
  babelConfigPath: resolveApp('config/.babelrc'),
}

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)
const ownPaths = {
  ownPath: resolveOwn('.'),
  configPath: resolveOwn('config')
}

module.exports = {
  appPaths,
  ownPaths,
}



