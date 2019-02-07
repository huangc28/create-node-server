'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')

const {
  appPaths,
  ownPaths,
} = require('../utils/path')

const config = JSON.parse(
  fs.readFileSync(path.resolve(ownPaths.configPath, 'babel.json'), 'utf-8')
)
const NODE_ENV = process.env.NODE_ENV || 'development'

require('@babel/register')(config)

// require application
// validate the application, it has to be instanceof app

const app = require(appPaths.appSrc)
// const app = require('../src')
const server = http.createServer(app)
server.listen(3000, err => {
  if (err) {
    console.log(err)
  }
  console.log('application hosted')
})

// switch (NODE_ENV) {
//   case 'development': {
//     // requires babel require hook, import babel and start to transpile code with babel presets.
//     require('@babel/register')(config)

//     // require application
//     // validate the application, it has to be instanceof app

//     const app = require(appPaths.appSrc)
//     // const app = require('../src')
//     const server = http.createServer(app)
//     server.listen(3000, err => {
//       if (err) {
//         console.log(err)
//       }

//       console.log('application hosted')
//     })

//     break;
//   }
//   case 'production': {

//     break;
//   }
//   default:
//     break;
// }
