'use strict'
const http = require("http")
const fs = require("fs")
const path = require("path")

const HttpServer = (function() {
    let httpServer = null
    const CLIENT_CODE = fs.readFileSync(
        path.join(__dirname, '../../scripts/client-script.js'),
        'utf8'
    )

    /**
     * serveHTML reads in a file based on the provided `filePath`
     * and injects a custom script before serving the HTML to the client
     * @param {string} filePath - the absolute path of the file to be served
     * @param {object} res - the response object from the HTTP request
     */
    const serveHTML = (filePath, res) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                return res.end('404 Not Found')
            }

            res.writeHead(200, { 'Content-Type': 'text/html' })
            const html = `${data.toString()}\n\n<script>${CLIENT_CODE}</script>`
            return res.end(html)
        })
    }

    /**
     * formatRequestUrl takes the url from an HTTP request
     * and returns a string where `.html` is added to urls that
     * don't include an extension.
     * @param {string} url - string representing the url from an HTTP request
     */
    const formatRequestUrl = (url) => {
        if (url.split(".").length == 1) {
            return `${url}.html`
        }
        return url
    }

    /**
     * returnFilePath converts the `url` provided from the HTTP request
     * and returns the absolute path for that requested file
     * @param {string} url - the url from the HTTP request
     */
    const returnFilePath = (url) => {
        let filename = url === '/' ? 'index.html' : formatRequestUrl(url.slice(1))
        return path.resolve(`html/${filename}`)
    }

    /**
     * requestHandler checks the request method and when it 
     * receives a `GET` request returns the requested html file
     * param {object} req - the HTTP request object
     * param {object} res - the HTTP response object
     */
    const requestHandler = (req, res) => {
        if (req.method === 'GET') {
            const filePath = returnFilePath(req.url)
            return serveHTML(filePath, res)
        }
    }

    /**
     * createSever setups up a http server on the provided `host` and `port`
     * param {string} host: the host name for the server
     * param {int} port: the port number for the http server to listen for connections
     */
    const createServer = (host, port) => {
        if (!httpServer) httpServer = http.createServer(requestHandler)
        httpServer.listen(port, () => {
            console.log(
                `Server listening on http://${host}:${port}/\n`
            )
        })
    }

    return {
        createServer
    }
})()

module.exports = {
    HttpServer
}

