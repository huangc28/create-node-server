const http = require('http')

require('@babel/register')({
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
})

const app = require('../src')
const server = http.createServer(app)

server.listen(3000, err => {
  console.log(err)
})
