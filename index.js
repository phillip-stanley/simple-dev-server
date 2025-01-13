const FileWatcher = require("./src/file-watcher/file-watcher");

const { SocketServer } = require("./src/socket-server/socket-server")
const HttpServer = require('./src//http-server/http-server-class');

SocketServer.setupServer(process.env.WS_PORT)

// setup http server
const httpServer = new HttpServer()
httpServer.createServer(process.env.HTTP_HOST, process.env.HTTP_PORT)

// setup file watcher and subscribe to `fileChange` event
const fileWatcher = new FileWatcher()
fileWatcher.setupWatcher(process.env.WATCH_DIR)
fileWatcher.on('fileChanged', (filename) => {
    SocketServer.broadcastMessage(`${filename} changed`)
})

