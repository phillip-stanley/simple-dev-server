'use strict'
const WebSocket = require("ws")

const SocketServer = (function() {
    let webSocketServer = null

    /**
     * connectionHandler send a message to a client as it connects
     * param {none}
     */
    const connectionHandler = (ws) => {
        console.log('New client connected')
        ws.send('You are connected to simple-dev-server')
    }

    /**
     * broadcastMessage method used to push messages to clients
     * param {string} message: the message to send to clients
     */
    function broadcastMessage(message) {
        webSocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast message: ${message}`)
            }
        })
    }

    /**
     * setupServer: setups up a websocket server
     * param {string} port: the port number the server should listen on.
     */
    function setupServer(port = 8080) {
        if (!webSocketServer) {
            webSocketServer = new WebSocket.Server({ port: port })
            console.log(`websocket server waiting for connections on port: ${port}`)
        }
        webSocketServer.on('connection', connectionHandler)
        webSocketServer.on('close', () => { console.log('client diconnected\n') })
    }

    return {
        setupServer: setupServer,
        broadcastMessage: broadcastMessage
    }
})()

module.exports = {
    SocketServer: SocketServer
}
