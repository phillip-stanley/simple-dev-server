const mockRequest = (data = {}) => ({
    body: data.body || {},
    params: data.params || {},
    query: data.query || {},
    session: { data: data.sessionsData || {} },
    ...data
})

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    res.writeHead = jest.fn().mockReturnValue(res)
    res.end = jest.fn().mockReturnValue(res)
    return res
}

module.exports = {
    mockRequest,
    mockResponse
}
