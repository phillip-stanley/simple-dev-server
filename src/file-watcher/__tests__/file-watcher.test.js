const FileWatcher = require('../file-watcher.js');

const chokidar = require('chokidar');

jest.mock('chokidar');

describe.only('FileWatcher', () => {
    let mockEmit;
    let mockOn;

    beforeEach(() => {
        fileWatcher = new FileWatcher();
        mockEmit = jest.fn();
        mockOn = jest.fn();
        jest.spyOn(console, 'log').mockImplementation(() => { });
        console.error = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize chokidar when `setupWatcher` is run', () => {
        const fakeTestDirectory = '/test/path/';
        const fakeTestOpts = { ignoreInitial: true }
        chokidar.watch.mockReturnValue({ on: mockOn });

        fileWatcher.setupWatcher(fakeTestDirectory, fakeTestOpts);

        expect(chokidar.watch).toHaveBeenCalledWith(fakeTestDirectory, fakeTestOpts);
        expect(mockOn).toHaveBeenCalledWith('all', expect.any(Function));
    });

    it('should emit `fileChanged` event when a file is modified', () => {
        const fakeTestDirectory = '/test/path/';
        const fakeTestOpts = { ignoreInitial: true };
        const fakeTestFile = 'test.html';
        chokidar.watch.mockReturnValue({ on: mockOn });

        fileWatcher.setupWatcher(fakeTestDirectory, fakeTestOpts);
        fileWatcher.on('fileChanged', mockEmit);

        const fileWatchHandler = mockOn.mock.calls[0][1];
        fileWatchHandler('change', fakeTestFile);

        expect(console.log).toHaveBeenCalledWith(`File ${fakeTestFile} changed`);
        expect(mockEmit).toHaveBeenCalledWith(fakeTestFile);
    });

    it('handleError should log and emit an error', () => {
        const testError = new Error('test error');
        chokidar.watch.mockImplementation(() => {
            throw testError;
        })
        const handleErrorSpy = jest.spyOn(fileWatcher, 'handleError');

        expect(() => {
            fileWatcher.setupWatcher('/test/path');
        }).not.toThrow(testError);

        expect(handleErrorSpy).toHaveBeenCalledWith(testError);

    })
});
