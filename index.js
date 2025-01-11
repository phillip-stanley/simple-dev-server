const http = require("http");
const chokidar = require("chokidar")

const { SocketServer } = require("./src/socket-server/socket-server")
const { HttpServer } = require("./src/http-server/http-server")

// Tasks

SocketServer.setupServer(process.env.WS_PORT)

HttpServer.createServer(process.env.HTTP_HOST, process.env.HTTP_PORT)

/**
 * filewatchHandler handles file change event handling
 * param {string} - event type Eg: `add`, `change`, `unlink`
 * param {string} - file name that triggered the event
 *
*/
const filewatchHandler = (event, path) => {
    if (event === 'change') {
        console.log('change event triggered')
        SocketServer.broadcastMessage('Action: reload')
    }
}

chokidar.watch('./html').on('all', filewatchHandler)

