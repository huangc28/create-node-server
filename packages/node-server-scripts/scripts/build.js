'use strict'

// build process should always performed in "production"
process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'production'

const rimraf = require('rimraf')
const cp = require('child_process')
const chalk = require('chalk')

const paths = require('../utils/path')

rimraf.sync(paths.appPaths.distPath)

// @todo catch error for this process
const spawn = cp.spawnSync(
  paths.appPaths.nodeModuleBinPath + '/babel',
  [
    '--config-file',
    paths.ownPaths.babelConfig,
    '--source-root',
    paths.appPaths.appPath,
    paths.appPaths.appSrc,
    '-d',
    paths.appPaths.distPath
  ],
  {
    stdio: 'inherit',
  },
)

if (spawn.error) {
  console.log()
  console.log(chalk.red('unable to build application with babel. exit with error: ') + spawn.error)
  console.log()
  process.exit()
}