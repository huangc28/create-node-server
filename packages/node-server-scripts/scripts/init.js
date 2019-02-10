// 1. create basic folder strcture for the project directory
// 2. append "scripts" on package.json with the following command:
//   - build: server-script build
//   - start: server-script start
//   - serve: server-script serve
// 3. install "jest" as test framework
// 4. extends eslint rules
const fs = require('fs-extra')
const path = require('path')

const paths = require('../utils/path')

module.exports = (
  rootPath,
  dependencies,
) => {
  const srcDir = path.resolve(rootPath, 'src')
  const entryFilename = path.resolve(srcDir, 'index.js')

  const packageJson = require(paths.appPaths.packageJsonPath)

  fs.ensureDirSync(srcDir)
  fs.close(fs.openSync(entryFilename, 'w'))

  // appending application command to project package.json scripts
  const scripts = {
    start: 'server-scripts start',
    build: 'server-scripts build',
    serve: 'server-scripts serve',
  }

  packageJson.scripts = scripts

  fs.writeFileSync(
    path.join(rootPath, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  )
}