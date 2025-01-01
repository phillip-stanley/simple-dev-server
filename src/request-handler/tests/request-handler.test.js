const fs = require("fs")
const path = require("path")
const { returnFilePath, requestHandler } = require("../request-handler.js")

const { mockResponse, mockRequest } = require("./mockutils.js")

jest.mock("fs")
jest.mock("path")

describe("returnFilePath", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("returns a file path for index.html when `/` is provided in the url", () => {
        const mock_url = "/"
        const mock_filename = "index.html"

        jest.spyOn(path, 'resolve').mockReturnValue(`html/${mock_filename}`)
        const filePathResult = returnFilePath(mock_url)

        expect(filePathResult).toEqual(expect.stringContaining(mock_filename))
    })

    it("returns a file for contact.html when `/contact` is provided in the url", () => {
        const mock_url = "/contact"
        const mock_filename = "contact.html"

        jest.spyOn(path, 'resolve').mockReturnValue(`html/${mock_filename}`)

        const filePathResult = returnFilePath(mock_url)

        expect(filePathResult).toEqual(expect.stringContaining(mock_filename))
    })

    it("returns a none html file if an extension is provied in the url", () => {
        const mock_url = "/style.css"
        const mock_filename = "style.css"

        jest.spyOn(path, 'resolve').mockReturnValue(`html/${mock_filename}`)

        const filePathResult = returnFilePath(mock_url)

        expect(filePathResult).toEqual(expect.stringContaining(mock_filename))
    })
})

describe("the requestHandler", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return a 405 error when a POST request is submitted", () => {
        const req = mockRequest({ method: "POST" })
        const res = mockResponse()

        requestHandler(req, res)

        expect(res.writeHead).toHaveBeenCalledWith(405, { 'Content-Type': 'text/plain' })
        expect(res.end).toHaveBeenCalledWith('405 POST is not supported')
    })
})
