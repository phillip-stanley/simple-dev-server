const fs = require("fs");
const path = require("path");

const CLIENT_CODE = fs.readFileSync(path.join(__dirname, '../../scripts/client-script.js'), 'utf8')

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

module.exports = {
    serveHTML
}
