const fs = require("fs")
const path = require("path")
const { serveHTML } = require("../file-handler")

// Mock the fs module
jest.mock("fs")


describe("serveHTML", () => {
    let res

    beforeEach(() => {
        // Mock the HTTP response object
        res = {
            writeHead: jest.fn(),
            end: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks() // clear mocks after each test
    })

    test('Should serve an HTML file successfully', () => {
        // Mock fs.readFile to simulate a successful file read

        const htmlstring = '<html><body>Hello World</body></html>'
        const scriptstring = '\n\n<script>undefined</script>'

        fs.readFile.mockImplementation((filePath, encoding, callback) => {
            callback(null, htmlstring)
        })

        const filename = path.join(__dirname, '../../html/index.html')
        serveHTML(filename, res);

        // Assertions
        expect(fs.readFile).toHaveBeenCalledWith(
            path.join(__dirname, '../../html/index.html'),
            'utf8',
            expect.any(Function)
        )

        expect(res.writeHead).toHaveBeenCalledWith(200, {
            'Content-Type': 'text/html'
        })

        expect(res.end).toHaveBeenCalledWith(
            `${htmlstring}${scriptstring}`
        )

    })
})

