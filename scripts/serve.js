'use strict'

const fs = require('fs')
const http = require('http')

const paths = require('../utils/path')

const distExists = fs.existsSync(paths.appPaths.distPath)

if (!distExists) {
  console.log('Dist directory does not seem to exists. ' +
  'Please build the production script before serving it'
  )

  process.exit()
}

const app = require(paths.appPaths.distPath)
const server = http.createServer(app)
server.listen(3000, function(err) {
  if (err) {
    console.log(err.message)
  }

  console.log('production application is up and running!')
})
