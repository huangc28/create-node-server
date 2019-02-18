const path = require('path')
const fs = require('fs')
const os = require('os')
const rimraf = require('rimraf')

const init = require('../init')

const createPackageJSON = dest => (
  new Promise((resolve, reject) => {
    fs.open(path.resolve(dest, 'package.json'), 'w', (err, fd) => {
      if (err) reject(err)

      fs.close(fd, err => {
        if (err) reject(err)
        resolve()
      })
    })
  })
)

const stuffSomeContentToPackageJSON = pathToJSON => (
  new Promise((resolve, reject) => {
    fs.writeFile(pathToJSON, JSON.stringify({}, null, 2) + os.EOL, err => {
      if (err) reject(err)
      resolve()
    })
  })
)

describe('script init project creation regards to project setup', () => {
  beforeAll(() => {
    const sampleAppPath = path.resolve(__dirname, 'testapp')

    if (fs.existsSync(sampleAppPath)) {
      rimraf.sync(sampleAppPath)
    }
  })

  test('creates application and makesure dependencies are installed properly', async () => {
    const sampleAppPath = path.resolve(__dirname, 'testapp')

    // create a sample test app
    fs.mkdirSync(sampleAppPath)
    // create sample package.json
    await createPackageJSON(sampleAppPath)

    await stuffSomeContentToPackageJSON(`${sampleAppPath}/package.json`)

    await init(sampleAppPath)

    rimraf.sync(sampleAppPath)
  })
})