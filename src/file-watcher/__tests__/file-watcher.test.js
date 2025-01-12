const FileWatcher = require('../file-watcher.js');

const chokidar = require('chokidar');

jest.mock('chokidar');

describe.only('FileWatcher', () => {
    let mockEmit;
    let mockOn;

    beforeEach(() => {
        mockEmit = jest.fn();
        mockOn = jest.fn();
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize chokidar when `setupWatcher` is run', () => {
        fakeTestDirectory = '/test/path/';
        fakeTestOpts = { ignoreInitial: true }
        chokidar.watch.mockReturnValue({ on: mockOn });

        const fileWatcher = new FileWatcher()
        fileWatcher.setupWatcher(fakeTestDirectory, fakeTestOpts);

        expect(chokidar.watch).toHaveBeenCalledWith(fakeTestDirectory, fakeTestOpts);
        expect(mockOn).toHaveBeenCalledWith('all', expect.any(Function));
    });

    it('should emit `fileChanged` event when a file is modified', () => {
        fakeTestDirectory = '/test/path/';
        fakeTestOpts = { ignoreInitial: true };
        fakeTestFile = 'test.html';
        chokidar.watch.mockReturnValue({ on: mockOn });

        fileWatcher = new FileWatcher()
        fileWatcher.setupWatcher(fakeTestDirectory, fakeTestOpts);
        fileWatcher.on('fileChanged', mockEmit);

        const fileWatchHandler = mockOn.mock.calls[0][1];
        fileWatchHandler('change', fakeTestFile);

        expect(console.log).toHaveBeenCalledWith(`File ${fakeTestFile} changed`);
        expect(mockEmit).toHaveBeenCalledWith(fakeTestFile);
    });
})

