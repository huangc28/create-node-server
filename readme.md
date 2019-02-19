# Create node server

Waste no time on setting up babel, various presets, expressjs, typescript...etc.
Start developing your server side code with above tools with a command.

I found myself recreating the same server side framework repetitively every time I try to
start a new project. **create-node-server** integrates the most common tools you'll need
for development. Just dive into the development straigh ahead.

This tool has the minimum setup to start a project with babel transpiling, eslint and jest.

# What stacks are embedded?

- babel
- expressjs
- eslint (WIP)
- jest (WIP)
- typescript (WIP)

## Early stage notify!

This project is in it's early stage. Much of the work are left to be done. PRs and suggestions are welcomed!!

## Installation

`npm init @huangc28/node-server myapp`

or if you use npx

`npx @huangc28/create-node-server myapp`

## Start development

`npm start`

It transpils the js code in run-time via **babel** require hook. This is for development only.

## Build production script

`npm run build`

The above command builds your next generation js code to es5 to host in production.
The built script will be placed in **dist** dirctory located in your root directory.
If **dist** directory is not found, it creates one.

## Serve production script

`npm run serve`

It serves the production script located in your **dist** directory.