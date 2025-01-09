const fs = require("fs")
const path = require("path")
const { serveHTML } = require("../file-handler")

const { mockResponse, mockRequest } = require("../../tests/mockutils.js")

jest.mock("fs")

describe("serveHTML", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should serve an HTML file successfully', () => {
        const req = mockRequest({ method: "GET", url: "/" })
        const res = mockResponse()

        const htmlstring = '<html><body>Hello World</body></html>'
        const scriptstring = '\n\n<script>undefined</script>'
        const filename = path.join(__dirname, '../../html/index.html')

        fs.readFile
            .mockImplementation((filePath, encoding, callback) => {
                callback(null, htmlstring)
            })

        serveHTML(filename, res);

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

    it('respond with 404 when there is no file to serve', () => {
        const req = mockRequest({ method: "GET", url: "/" })
        const res = mockResponse()

        const filename = path.join(__dirname, '../../html/index.html')

        fs.readFile
            .mockImplementation((filePath, encoding, callback) => {
                callback(new Error("file not found"), "")
            })

        serveHTML(filename, res)

        expect(res.writeHead).toHaveBeenCalledWith(404, {
            'Content-Type': 'text/plain'
        })
    })
})

