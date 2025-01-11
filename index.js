const { SocketServer } = require("./src/socket-server/socket-server")
const { HttpServer } = require("./src/http-server/http-server")
const { FileWatcher } = require("./src/file-watcher/file-watcher")

// setup websocket server for monitor browser connections
SocketServer.setupServer(process.env.WS_PORT)

// setup http server to serve development files
HttpServer.createServer(process.env.HTTP_HOST, process.env.HTTP_PORT)

// setup filewatcher module 
FileWatcher.setupWatcher('./html')
FileWatcher.on('File changed', (filename) => {
    SocketServer.broadcastMessage(`${filename} changed`)
})

