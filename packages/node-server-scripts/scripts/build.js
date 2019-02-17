'use strict'

// build process should always performed in "production"
process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'production'

const rimraf = require('rimraf')
const cp = require('child_process')

const paths = require('../utils/path')

rimraf.sync(paths.appPaths.distPath)

// @todo catch error for this process
const spawn = cp.spawnSync(
  paths.appPaths.nodeModuleBinPath + '/babel',
  [
    '--config-file',
    paths.ownPaths.babelConfig,
    paths.appPaths.appSrc,
    '-d',
    'dist'
  ],
  {
    stdio: 'inherit',
  },
)

if (spawn.error) {
  console.log('unable to build application with babel. exit with error:' + spawn.error)
  process.exit()
}
