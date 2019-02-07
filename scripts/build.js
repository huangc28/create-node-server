'use strict'

const rimraf = require('rimraf')
const { spawnSync } = require('child_process')
const http = require('http')

const { appPaths } = require('../utils/path')

rimraf.sync(appPaths.distPath)

// @todo catch error for this process
const spawn = spawnSync(
  '/Users/apple/Documents/self-trains/create-node-server/node_modules/.bin/babel',
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

const app = require(appPaths.distPath).default

const server = http.createServer(app)

server.listen(3000, function (err) {
  if (err) {
    console.log(err)
  }

  console.log('production application hosted')
})