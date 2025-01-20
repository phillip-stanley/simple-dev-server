'use strict'
const EventEmitter = require('events');
const chokidar = require('chokidar');


class FileWatcher extends EventEmitter {
    constructor(opts = {}) {
        super();
        this.watcher = null;
        this.watchEvents = opts.watchEvents || ['change']
    }

    /**
    * setupWatcher setups up a file watcher with `chokidar`
    * @param {string} directory - the directory to watch for file changes
    * @param {object} opts - object for configuration options for the watcher.
    * @returns {void}
    */
    setupWatcher(directory = '.', opts = {}) {
        try {
            const watchOptions = { ...opts, ignoreInitial: true };
            this.watcher = chokidar.watch(directory, watchOptions);
            this.watcher.on('all', this.fileWatchHandler.bind(this));
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
    * fileWatchHandler handles all watch events emitted by `this.watcher`
    * @param {object} event - the event object sent from `chokidar`
    * @param {string} opts - the path of the file changed
    * @returns {void}
    */
    fileWatchHandler(event, path) {
        if (this.watchEvents.includes(event)) {
            console.log(`File ${path} changed`)
            this.emit('fileChanged', path)
        }
    }

    /**
    * handleError emits an error event when called with an error message
    * @param {string} error - error message to emit to the application
    * @returns {void}
    */
    handleError(error) {
        console.error(`FileWatcher: ${error}`)
        this.emit('error', error);
    }
}

module.exports = FileWatcher
