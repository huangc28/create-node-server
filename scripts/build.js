'use strict'

const rimraf = require('rimraf')
const { spawnSync } = require('child_process')

const { appPaths } = require('../utils/path')

rimraf.sync(appPaths.distPath)

// @todo catch error for this process
spawnSync(
  appPaths.nodeModulePath + '/babel',
  [
    '--config-file',
    appPaths.babelConfigPath,
    appPaths.appSrc,
    '-d',
    'dist'
  ],
  {
    stdio: 'inherit',
  },
)
