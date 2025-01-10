/**
 * connectionHandler sends a message to a client as it connects
 * and logs out a client disconnected message when they close the
 * connect.
 * @param {object} req - the HTTP request object
 */
const connectionHandler = (ws) => {
    console.log('New client connected')
    ws.send('You are connection to simple-dev-server websocket')
    ws.on('close', () => { console.log('client disconnected\n') })
}

module.exports = {
    connectionHandler
}
