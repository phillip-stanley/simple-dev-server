(() => {
    const ws = new WebSocket('http://localhost:8080')

    ws.onopen = () => {
        console.log('Connected to  simple-dev-server')
    }
    ws.onmessage = (message) => {
        console.log(message.data)
        if (message.data === 'Broadcast message: Action: reload') {
            console.log('reload')
            window.location.reload()
        }
    }
    ws.onclose = () => {
        console.log('Connection closed')
    }
})()
