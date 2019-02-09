#!/usr/bin/env node

// creates a command that initializes the node server project.
// this command should:
//   - create application directory with a name specified to the command
//   - check if directory is valid for initializing the application
//      1. directory is empty
//      2. npm has the permission to manipulate it
//   - construct package.json based on the command option specified
//   - write package.json to project directory
//   - collect neccessary dependencies
//      1. node-server-script, (babel, preset, webpack).
//      2. typescript if specified in command.
//   - spawn a process to install dependencies in the project folder.
// npm init create-node-server ./my-app --verbose --use-typescript
// create-node-server only works with "npm" at the moment

const path = require('path')
const command = require('commander')
const chalk = require('chalk')
const validateProjectName = require('validate-npm-package-name')
const cp = require('child_process')
const fs = require('fs-extra')
const os = require('os')

const packageJson = require('./package.json')

const program = new command.Command(packageJson.name)

let projectName = null
program
  .version(packageJson.version)
  .arguments('<projectName>')
  .usage('<projectName> [options]')
  .option('--verbose')
  .action(name => {
    projectName = name
  })
  .allowUnknownOption()
  .on('--help', () => {
    console.log('some help messages')
  })
  .parse(process.argv)

if (!projectName) {
  console.log(chalk.red('Please provide project name!'))
  process.exit(1)
}

/**
 * Check if the directory name is valid npm package name
 */
const checkPackageNameValid = name => {
  const result = validateProjectName(name)

  if (!result.validForNewPackages) {
    console.log(chalk.red(
      'project can not be created.' +
      'project name provided is not a valid npm name'
    ))
    console.log()
    console.log(chalk.cyan(
      'please refer to https://docs.npmjs.com/files/package.json' +
      'for valid package naming'
    ))

    process.exit(1)
  }
}

createApp(projectName)

function createApp(name) {
  // check if the name is valid npm package name
  checkPackageNameValid(name)

  // check if the name is an absolute path, or relative path
  // if is an absolute path, create the project directory straight ahead
  // is if a relative path, resolve to absolute path then creates the project directory
  const root = path.resolve(name)
  const appName = path.basename(name)
  // create directory if the directory does not exist.
  fs.ensureDirSync(root)

  console.log(chalk.green(`creating node project in ${root}...`))
  console.log()

  // write packageJson to path specified
  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  }

  // appending application command to project package.json scripts
  const scripts = {
    start: 'server-scripts start',
    build: 'server-scripts build',
    serve: 'server-scripts serve',
  }

  packageJson.scripts = scripts

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  )

  // collect a list of dependencies to be installed to the project
  // @todo typescript option would available in the later version
  // if --use-typescript is specified, we would push typescript
  // realtive dependencies to "dependencies" array
  const dependencies = [
    '@huangc28/create-node-server'
  ]

  install(
    root,
    dependencies,
  )
}

function install (
  root,
  dependencies,
) {
  const command = 'npm'
  const args = [
    'install',
    'save',
    '--save-exact',
  ].concat(dependencies)

  // change the directory to project directory to perform installation
  process.chdir(root)

  const spawn = cp.spawn(
    command,
    args,
    {
      stdio: 'inherit'
    }
  )

  spawn.on('close', code => {
    console.log('code', code)
  })
}