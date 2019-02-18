'use strict'

// build process should always performed in "production"
process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'production'

const rimraf = require('rimraf')
const webpack = require('webpack')
const chalk = require('chalk')

const config = require('../config/webpack.config')()
const paths = require('../utils/path')

rimraf.sync(paths.appPaths.distPath)

// @todo catch error for this process
webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log('stats', stats)

    console.log(
      'unable to build application with webpack + babel-loader. exit with error:' +
      stats.toString()
    )
    process.exit(1)
  }

  console.log(chalk.green('success!'))
  console.log()
  console.log(
    'Production bundle is now placed in: ' + chalk.cyan(paths.appPaths.distPath)
  )
})