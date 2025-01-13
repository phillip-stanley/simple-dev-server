'use strict';
const WebSocket = require('ws');


class SocketServer {
    constructor() {
        this.webSocketServer = null;
        this.connectionHandler = this.connectionHandler.bind(this);
    }

    /**
     * broadcastMessage pushes messages to all connected clients
     * @param {string} message - the message to broadcast
     * @return {void}
     */
    broadcastMessage(message) {
        this.webSocketServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast message: ${message}`);
            }
        });
    }

    /**
     * connectionHandler sends a message to a client when it connects
     * @param {object} ws - the websocket object passed to the handler
     * @return {void}
     */
    connectionHandler(ws) {
        console.log('New client connected')
        ws.send('You are connected to simple-dev-server')
    }

    /**
    * sets up a websocket server
    * @param {number} port - the port number for the ws server to listen
    * @returns {void}
    */
    setupServer(port = 8080) {
        this.webSocketServer = new WebSocket.Server({ port: port });
        this.webSocketServer.on('connection', this.connectionHandler);
        this.webSocketServer.on('close', () => {
            console.log('client diconnected\n');
        })
    }
}

module.exports = SocketServer

