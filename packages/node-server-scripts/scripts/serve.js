'use strict'

process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'development'

const fs = require('fs')
const http = require('http')

require('../config/env')
const paths = require('../utils/path')
const PORT = process.env.PORT || 3000
const distExists = fs.existsSync(paths.appPaths.distPath + '/index.js')

if (!distExists) {
  console.log('Dist directory does not seem to exists. ' +
  'Please build the production script before serving it'
  )

  process.exit(1)
}

const app = require(paths.appPaths.distPath + '/index.js')

const server = http.createServer(app)
server.listen(PORT, function(err) {
  if (err) {
    console.log(err.message)
  }

  console.log('production application is up and running!')
})
