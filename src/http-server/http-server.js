'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');


class HttpServer {
    constructor() {
        this.httpServer = null;
        this.clientCode = fs.readFileSync(
            path.join(__dirname, '../../scripts/client-script.js'),
            'utf8'
        )

        this.requestHandler = this.requestHandler.bind(this);
        this.formatRequestUrl = this.formatRequestUrl.bind(this);
        this.returnFilePath = this.returnFilePath.bind(this);
        this.ServeHTML = this.ServeHTML.bind(this);
    }

    /**
     * serveHTML reads in a file based on the provided `filePath`
     * and injects a custom script before serving the HTML to the client
     * @param {string} filePath - the absolute path of the file to be served
     * @param {object} res - the response object from the HTTP request
     */
    ServeHTML(filePath, res) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('404 Not Found');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            const html = `${data.toString()}\n\n<script>${this.clientCode}</script>`;
            return res.end(html);
        })
    }

    /**
     * returns the formated file name from the request, where a name
     * without an extension is provided it appends `.html` to the file name
     * @param {string} url - the url from the request.
     * @returns {string} - the filename, which has `.html` added where no
     * file extension is provided.
     */
    formatRequestUrl(url) {
        if (url.split('.').length == 1) {
            return `${url}.html`;
        }
        return url;
    }

    /**
     * returns a file path for the requested file
     * @param {string} url - the url take from the http request
     * @returns {string} - the file path for the request file
     */
    returnFilePath(url) {
        let filename = url === '/'
            ? 'index.html'
            : this.formatRequestUrl(url.slice(1));
        return path.resolve(`html/${filename}`);
    };

    /**
     * Handler for http requests, support only for `GET` requests
     * @param {object} req - request object from the HTTP request made.
     * @param {object} res - response object from the HTTP response.
     * @returns {string} -  the HTML string response.
     */
    requestHandler(req, res) {
        if (req.method === 'GET') {
            const filePath = this.returnFilePath(req.url);
            return this.ServeHTML(filePath, res);
        }
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('405 Method Not Allowed');
    }

    /**
    * Creates and starts an HTTP server.
    * @param {string} host - The hostname or IP address to bind the server to.
    * @param {number} port - The port number to listen on.
    * @param {void}
    */
    createServer(host, port) {
        try {
            this.httpServer = http.createServer(this.requestHandler)
            this.httpServer.listen(port, () => {
                console.log(`Server listening on http://${host}:${port}/\n`);
            })
        } catch (error) {
            console.error(`Sever failed to start: ${error}`);
        }
    }
}

module.exports = HttpServer

