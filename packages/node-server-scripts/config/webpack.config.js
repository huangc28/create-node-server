const path = require('path')
const fs = require('fs')

const paths = require('../utils/path')

const babelConfig = JSON.stringify(fs.readFileSync(paths.ownPaths.babelConfig, 'utf-8'))

module.exports = env => {
  return {
    entry: path.resolve(paths.appPaths.appSrc + '/index.js'),
    output: {
      path: path.resolve(paths.appPaths.distPath),
      filename: 'app.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            "presets": babelConfig.presets,
          }
        }
      ]
    }
  }
}