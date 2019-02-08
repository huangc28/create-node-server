## Create node server

Waste no time on setting up babel, various presets, expressjs, typescript...etc.
Start developing your server side code fast.

I found myself recreating the same server side framework repetitively every time I try to
start a new project. **create-node-server** integrates the most common tools you'll need
for development. Just dive into the development straigh ahead.

## Helps needed

This project is in it's early stage. Much of the work are left to be done. PRs and suggestions are
needed!

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

## TODOs

1. write readme to demonstrate the purpose and the usage of this project.
2. install more babel plugins to be more complete on js transpiling
3. setting up typescript
4. use webpack to build production script. babel presets should be generate dynamically. babel-cli does not support reading dynamic content of babel config.