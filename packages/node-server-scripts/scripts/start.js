'use strict'

process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

const http = require('http')
const fs = require('fs')

require('../config/env')
const paths = require('../utils/path')

const config = JSON.parse(fs.readFileSync(paths.ownPaths.babelConfig, 'utf-8'));
const PORT = process.env.PORT || 3000
// setting the root directory for babel to properly transpile the "application"
config.cwd = paths.appPaths.appSrc

// requires babel hook, import babel and start to transpile code with babel presets.
require(paths.appPaths.nodeModulePath + '/@babel/register')(config)

// validate the application, it has to be instanceof express app
let app = require(paths.appPaths.appSrc)

// if the application is exported via es6 module,
// retrieve it from default attribute.
if (app.default) {
  app = app.default
}

if (!app) {
  console.log(
    'express application is not declared! ' +
    'Please provide entry script for your application:'
  )
  console.log()
  console.log(
    'import express from \'express\'' +
    'const app = express()' +
    'export default app'
  )

  process.exit(1)
}

const server = http.createServer(app.default)

// @todo read application hosting from env instead of hardcoded here
server.listen(PORT, err => {
  if (err) {
    console.log(err)
  }

  console.log('application hosted')
})
