'use strict'

const http = require('http')
const fs = require('fs')

require('../config/env')
const paths = require('../utils/path')

const config = JSON.parse(fs.readFileSync(paths.ownPaths.babelConfig, 'utf-8'));
const PORT = process.env.PORT || 3000
// setting the root directory for babel to properly transpile the "application"
config.cwd = paths.appPaths.appSrc

// requires babel hook, import babel and start to transpile code with babel presets.
require('@babel/register')(config)

// validate the application, it has to be instanceof app
const app = require(paths.appPaths.appSrc)
const server = http.createServer(app)

// @todo read application hosting from env instead of hardcoded here
server.listen(PORT, err => {
  if (err) {
    console.log(err)
  }

  console.log('application hosted')
})
