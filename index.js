const SocketServer = require('./src/socket-server/socket-server');
const HttpServer = require('./src//http-server/http-server');
const FileWatcher = require("./src/file-watcher/file-watcher");

// setup socket server
const socketServer = new SocketServer()
socketServer.setupServer(process.env.WS_PORT)

// setup http server
const httpServer = new HttpServer()
httpServer.createServer(process.env.HTTP_HOST, process.env.HTTP_PORT)

// setup file watcher and subscribe to `fileChange` event
const fileWatcher = new FileWatcher()
fileWatcher.setupWatcher(process.env.WATCH_DIR)
fileWatcher.on('fileChanged', (filename) => {
    socketServer.broadcastMessage(`${filename} changed`)
})

