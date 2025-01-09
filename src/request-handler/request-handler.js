const path = require("path")
const fileHandlerModule = require("../file-handler/file-handler")
//const { serveHTML } = require("../file-handler/file-handler")
const { formatRequestUrl } = require("../utils/utils")

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
 * requestHandler checks the request method and with `GET`
 * requests if handles the request and returns the request html file
 * @param {object} req - the HTTP request object
 * @param {object} res - the HTTP response object
 */
const requestHandler = (req, res) => {
    if (req.method === 'GET') {
        filePath = returnFilePath(req.url)
        return fileHandlerModule.serveHTML(filePath, res)
    }
    res.writeHead(405, { 'Content-Type': 'text/plain' })
    res.end(`405 ${req.method} is not supported`)
}

module.exports = {
    returnFilePath,
    requestHandler
}
