#!/usr/bin/env node

const SocketServer = require('./src/socket-server/socket-server');
const HttpServer = require('./src//http-server/http-server');
const FileWatcher = require("./src/file-watcher/file-watcher");

// environment variables
const watchDirectory = process.env.WATCH_DIR || './public';
const httpHost = process.env.HTTP_HOST || 'localhost';
const httpPort = process.env.HTTP_PORT || 8000;

// setup socket server
const socketServer = new SocketServer();
socketServer.setupServer(process.env.WS_PORT);

// setup http server
const httpServer = new HttpServer(watchDirectory);
httpServer.createServer(httpHost, httpPort);

// setup file watcher and subscribe to `fileChange` event
const fileWatcher = new FileWatcher();
fileWatcher.setupWatcher(watchDirectory);
fileWatcher.on('fileChanged', (filename) => {
    socketServer.broadcastMessage(`${filename} changed`)
})

