'use strict';
const WebSocket = require('ws');

const SocketServer = require('../socket-server');

jest.mock('ws');


describe('SocketServer', () => {
    beforeEach(() => {
        mockOn = jest.fn(() => { });
    });

    it('should initialise a websocket server when `setupServer` is run', () => {
        const fakePort = 8080;
        const socketSpy = jest.spyOn(WebSocket, 'Server')
            .mockReturnValue({ on: mockOn });
        const socketServer = new SocketServer();

        socketServer.setupServer(fakePort);

        expect(socketSpy).toHaveBeenCalledWith({ port: fakePort });
    });
})


