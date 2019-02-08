'use strict'

// reads the environment variables from the application path
const fs = require('fs')

const paths = require('../utils/path')

if (fs.existsSync(paths.appPaths.dotenv)) {
  require('dotenv').config({
    path: path.appPaths.dotenv,
  })
}
