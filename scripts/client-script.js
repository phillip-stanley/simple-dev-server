(() => {
    const ws = new WebSocket('http://localhost:8080')

    ws.onopen = () => {
        console.log('Connected to  simple-dev-server')
    }
    ws.onmessage = (message) => {
        console.log('data: ', message)
        console.log('Message: ', message.data)
    }
    ws.onclose = () => {
        console.log('Connection closed')
    }
})()
