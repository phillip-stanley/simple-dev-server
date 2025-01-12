'use strict'
const EventEmitter = require('events');
const chokidar = require('chokidar');


class FileWatcher extends EventEmitter {
    constructor() {
        super();
        this.watcher = null;
    }

    setupWatcher(directory = '.', opts = {}) {
        const watchOptions = { ...opts, ignoreInitial: true };
        this.watcher = chokidar.watch(directory, watchOptions);
        this.watcher.on('all', this.fileWatchHandler.bind(this));
    }

    fileWatchHandler(event, path) {
        if (event === 'change') {
            console.log(`File ${path} changed`)
            this.emit('fileChanged', path)
        }
    }
}

module.exports = FileWatcher
