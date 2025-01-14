const http = require('http');
const fs = require('fs');
const path = require('path');

const HttpServer = require('../http-server');
const { mockResponse, mockRequest } = require('../../tests/mockutils');

jest.mock('http');
jest.mock('fs');
jest.mock('path');


describe('HttpServer', () => {
    beforeEach(() => {
        httpServer = new HttpServer();
        mockListen = jest.fn();
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should inialise http  server when `createServer` is run', () => {
        const fakeHost = 'localhost';
        const fakePort = 8080;
        http.createServer.mockReturnValue({ listen: mockListen });

        httpServer.createServer(fakeHost, fakePort);

        expect(http.createServer).toHaveBeenCalledWith(httpServer.requestHandler);
        expect(mockListen).toHaveBeenCalled();
    });

    it('should return a 405 for none GET requests', () => {
        const mockReq = mockRequest({ method: 'POST' });
        const mockRes = mockResponse();

        httpServer.requestHandler(mockReq, mockRes);

        expect(mockRes.writeHead).toHaveBeenCalledWith(
            405, { 'Content-Type': 'text/plain' }
        );
        expect(mockRes.end).toHaveBeenCalledWith('405 Method Not Allowed');
    });

    it('should return `html/index.html` when `/` is provided in req.url', () => {
        const fakeUrl = '/';
        const fakeFilename = 'index.html';
        const formatUrlSpy = jest.spyOn(httpServer, 'formatRequestUrl')
            .mockImplementation(() => { });
        const pathSpy = jest.spyOn(path, 'resolve').mockImplementation(
            () => `html/${fakeFilename}`
        );

        httpServer.returnFilePath(fakeUrl);

        expect(pathSpy).toHaveBeenCalledWith(`html/${fakeFilename}`);
        expect(formatUrlSpy).not.toHaveBeenCalled();
    });

    it('should format the request url when a filename is provided in the request', () => {
        const fakeUrl = '/test-page';
        const fakeFilename = 'test-page.html';
        const pathSpy = jest.spyOn(path, 'resolve').mockImplementation(
            () => `html/${fakeFilename}`
        );

        const result = httpServer.returnFilePath(fakeUrl);

        expect(pathSpy).toHaveBeenCalledWith(`html/${fakeFilename}`);
        expect(result).toEqual(`html/${fakeFilename}`);
    });
})
