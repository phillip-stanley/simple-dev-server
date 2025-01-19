# simple-dev-server

Simple-dev-server is a small node server that serves HTML files and implements
hot-reloaded by injecting a script into each html file is serves. Connecting the page
and the browser to the dev websocket server.

## Installation

install the package globally on your system
```js
npm i -g @phill-stanley/simple-dev-server
```

install as a dev dependency to your project
```js
npm i --save-dev @phill-stanley/simple-dev-server
```

## Configuration

run with defaults. Add the following to your package.json scripts
```js
"dev-server": "simple-dev-server"
```

run custom setup. Add the following to your package.json scripts
```js
"dev-server": "WATCH_DIR='./src' HTTP_PORT=3000 HTTP_HOST='127.0.0.1' simple-dev-server"
```
