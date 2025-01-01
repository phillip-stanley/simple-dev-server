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

module.exports = {
    formatRequestUrl
}
