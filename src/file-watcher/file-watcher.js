'use strict'
const EventEmitter = require('events');
const chokidar = require('chokidar');


class FileWatcher extends EventEmitter {
    constructor(opts = {}) {
        super();
        this.watcher = null;
        this.watchEvents = opts.watchEvents || ['change']
    }

    setupWatcher(directory = '.', opts = {}) {
        try {
            const watchOptions = { ...opts, ignoreInitial: true };
            this.watcher = chokidar.watch(directory, watchOptions);
            this.watcher.on('all', this.fileWatchHandler.bind(this));
        } catch (error) {
            this.handleError(error);
        }
    }

    fileWatchHandler(event, path) {
        if (this.watchEvents.includes(event)) {
            console.log(`File ${path} changed`)
            this.emit('fileChanged', path)
        }
    }

    handleError(error) {
        console.error(`FileWatcher: ${error}`)
        this.emit('error', error);
    }
}

module.exports = FileWatcher
