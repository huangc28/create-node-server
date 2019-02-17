const path = require('path')

const init = require('../init')

describe('script init project creation regards to project setup', () => {
  test('creates application and makesure dependencies are installed properly', async () => {
    const sampleAppPath = path.resolve(__dirname, 'testapp')

    await init(sampleAppPath)
  })
})