#!/usr/bin/env node
'use strict'

const args = process.argv
const scripts = args.slice(1)

// user might input:
//  1. npm hello start a b c
//  2. npm world start a b c
//
// The user intends to input "start" command with the arguments "a b c"
// in the above case, a b c are the arguments for "start" command.
// try to match a supported script, if a match is found, execute the corresponding script.
const scriptIndex = scripts.findIndex(
  script => script === 'start' || script === 'test' || script === 'build' || script === 'serve'
)

const { spawnSync } = require('child_process')
const script = scripts[scriptIndex]

const whichCommand = script => (
  script === 'start'
    ? 'nodemon'
    : 'node'
)


let result = null

switch (script) {
  case 'test':
  case 'serve':
  case 'build': {
    result = spawnSync(
      whichCommand(script),
      [
        require.resolve('../scripts/' + scripts[scriptIndex] + '.js'),
        scripts.slice(scriptIndex + 1).join(' '),
      ],
      {
        stdio: 'inherit',
      },
    )

    break
  }
  case 'start': {
    // nodemon --exec babel-node src ---> how to spin up the application in src?
    // we use babel-node to host up the application straight ahead.
    // we need to resolve "src" path of the process that spins up this script.

    // use nodemon and babel-node to spin up the application
    // execute the corresponding script
    result = spawnSync(
      whichCommand(script),
      [
        '--exec',
        'node',
        require.resolve('../scripts/' + scripts[scriptIndex] + '.js'),
        scripts.slice(scriptIndex + 1).join(' '),
      ],
      {
        stdio: 'inherit',
      },
    )
  }
  break
  default: {
    // error output script is not supported
    console.log('Unknown script:' + script)
    break
  }
}

if (result && result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log('the application failed to spin up because the child process exits too early')
  }

  if (result.signal === 'SIGTERM') {
    console.log('the application failed to build. ' +
      'Someone might have called `kill` or `killall`, ' +
      'or the system could be shutting down.')
  }

  process.exit(1)
}
