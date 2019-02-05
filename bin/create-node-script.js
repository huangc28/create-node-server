// 1. npm start ---> cd bin && node create-node-script.js
// 2. read .env file and expose it to process.env
// 3. transpile this project with babel presets
// 4. import the express application.
// 5. host up the application with http server
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
  script => script === 'start' || script === 'test'
)

const { spawnSync } = require('child_process')
const script = scripts[scriptIndex]
switch (script) {
  case 'test':
  case 'dev': {
    // nodemon --exec babel-node src ---> how to spin up the application in src?
    // we need to resolve "src" path of the process that spins up this script
    const result = spawnSync(
      'nodemon',
      [
        '--exec',
        'babel-node'
      ]
    )
  }
  case 'start': {
    // use nodemon and babel-node to spin up the application
    // const whichNode = process.env.NODE_ENV === 'development'
    //   ? 'nodemon --exec babel-node'
    //   :


    // execute the corresponding script
    const result = spawnSync(
      'node',
      [
        require.resolve('../scripts/' + scripts[scriptIndex] + '.js'),
        scripts.slice(scriptIndex + 1).join(' '),
      ],
      {
        stdio: 'inherit',
      },
    )

    if (result.signal) {
      if (result.signal === 'SIGKILL') {
        console.log('the application failed to spin up because the child process exits too early')
      }

      process.exit(1)
    }
  }
  break
  default: {
    // error output script is not supported
    console.log('Unknown script:' + script)
    break
  }
}
