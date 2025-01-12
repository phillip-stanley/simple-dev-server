const FileWatcher = require("./src/file-watcher/file-watcher");

const { SocketServer } = require("./src/socket-server/socket-server")
const { HttpServer } = require("./src/http-server/http-server");

SocketServer.setupServer(process.env.WS_PORT)
HttpServer.createServer(process.env.HTTP_HOST, process.env.HTTP_PORT)

// setup file watcher and subscribe to `fileChange` event
const fileWatcher = new FileWatcher()

//fileWatcher.setupWatcher('./html')
fileWatcher.setupWatcher()
fileWatcher.on('fileChanged', (filename) => {
    SocketServer.broadcastMessage(`${filename} changed`)
})

