const EventEmitter = require("events")
const chokidar = require("chokidar")

const FileWatcher = (function() {
    let emitter = null

    /**
     * @name fileWatchHandler file watcher event and looks for file changed
     * @param {object} event: `Chokidar` event object
     * @param {string} path: the file that changed and its relative path
     */
    const fileWatcherHandler = (event, path) => {
        if (event === "change" && emitter) {
            console.log(`File ${path} has changed`)
            emitter.emit('File changed', path)
        }
    }

    /**
     * @name setupWatcher handles setup of watch handler and client notification service
     * @param {object} clientNofitcation service to emit events to browsers
     * @param {string} directory to watchf for file changes
     */
    const setupWatcher = (directory) => {
        chokidar.watch(directory).on('all', fileWatcherHandler)
        emitter = new EventEmitter()
    }

    return {
        setupWatcher: setupWatcher,
        on: (event, callback) => {
            emitter.addListener(event, callback)
        }
    }
})()

module.exports = {
    FileWatcher
}
