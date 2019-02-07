
const rimraf = require('rimraf')
const { spawnSync } = require('child_process')

const { appPaths } = require('../utils/path')

rimraf.sync(appPaths.distPath)
spawnSync('babel')
