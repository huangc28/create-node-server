// build the production application to "dist"
// if "dist" directory does not exist, create the directory first
const rimraf = require('rimraf')

const { appPaths } = require('../utils/path')

rimraf.sync(appPaths.distPath)