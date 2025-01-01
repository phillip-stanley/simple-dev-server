const http = require("http");
const { requestHandler } = require("./src/request-handler/request-handler")

// Goals
// 1. Why can't path be used with ES modules?
// 2. compare fs.readFile and fs.readFileSync for the fileHandler function of this server
// 3. look at websockets and how to pass messages to the browser


// Tasks
// 1. Setup module for handling files and script injection (commonJS)
// 2. Sever a 404 html file for handling 404 errors
// 4. write tests for the previous 2 steps

// TODO: move these to env variables
const port = 8000
const host = "127.0.0.1"

const server = http.createServer(requestHandler);

server.listen(port, () => {
    console.log(`Server listening at http://${host}:${port}/`)
});


