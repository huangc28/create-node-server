// 1. create basic folder strcture for the project directory
// 2. append "scripts" on package.json with the following command:
//   - build: server-script build
//   - start: server-script start
//   - serve: server-script serve
// 3. install "jest" as test framework
// 4. extends eslint rules
const fs = require('fs-extra')
const path = require('path')
const cp = require('child_process')

const paths = require('../utils/path')

const depsToString = deps => Object
  .keys(deps)
  .reduce((accu, curr) => accu.concat(`${curr}@${deps[curr]}`), [])

function installDependencies (dependencies) {
  const command = 'npm'
  const args = [
    'install',
    '--no-save',

  ]
  .concat(depsToString(dependencies))
  .concat([
    '--loglevel',
    'verbose',
  ])

  return new Promise((resolve, reject) => {
    const spawn = cp.spawn(
      command,
      args,
      {
        stdio: 'inherit'
      }
    )

    spawn.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        })
        return
      }
      resolve()
    })
  })
}

module.exports = (
  rootPath,
  dependencies,
) => {
  const srcDir = path.resolve(rootPath, 'src')
  const entryFilename = path.resolve(srcDir, 'index.js')

  const packageJson = require(paths.appPaths.packageJsonPath)
  const depPackageJson = require(paths.ownPaths.packageJsonPath)

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

  const depsToBeInstalled = Object.assign(
    {},
    depPackageJson.dependencies,
    depPackageJson.devDependencies,
  )

  installDependencies(depsToBeInstalled)
    .then(() => {
      console.log('done initializing')
    })
}