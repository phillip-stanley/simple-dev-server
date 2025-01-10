const http = require("http");
const WebSocket = require("ws");

const { connectionHandler } = require("./src/connection-handler/connection-handler")
const { requestHandler } = require("./src/request-handler/request-handler")

// Goals
// 1. Why can't path be used with ES modules?
// 2. compare fs.readFile and fs.readFileSync for the fileHandler function of this server
// 3. look at websockets and how to pass messages to the browser


// Tasks
// 1. look at file watcher
// 2. setup a file watcher for the html directory
// 3. push a ws.send() message when a file changes
// 4. get the browser to reload when this message is received

const wsServer = new WebSocket.Server({ port: 8080 })

wsServer.on('connection', connectionHandler)


console.log('websocket server is running on ws://localhost:8080')

const port = process.env.HTTP_PORT
const host = process.env.HTTP_HOST

const server = http.createServer(requestHandler);

server.listen(port, () => {
    console.log(`Server listening at http://${host}:${port}/\n`)
});


