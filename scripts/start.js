'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')

const { appPaths } = require('../utils/path')

const config = require('../config/babel.json')
// setting the root directory for babel to properly transpile the "application"
config.cwd = appPaths.appSrc

// requires babel require hook, import babel and start to transpile code with babel presets.
require('@babel/register')(config)

// validate the application, it has to be instanceof app
const app = require(appPaths.appSrc)
const server = http.createServer(app)

// @todo read application hosting from env instead of hardcoded here
server.listen(3000, err => {
  if (err) {
    console.log(err)
  }

  console.log('application hosted')
})
