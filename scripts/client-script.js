(() => {
    const ws = new WebSocket('http://localhost:8080')

    ws.onopen = () => {
        console.log('Connected to simple-dev-server')
    }

    ws.onmessage = (message) => {
        if (message.data.includes('changed')) {
            console.log(message.data)
            window.location.reload()
        }
    }

    ws.onclose = () => {
        console.log('Connection closed')
    }
})()
