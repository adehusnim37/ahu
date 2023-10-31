export function createErrorResponse400(res, message) {
    return res.status(400).json({
        message: `${message}`
    });
}

export function createErrorResponse404(res, message) {
    return res.status(404).json({
        message: ` ${message}`
    });
}

export function createErrorResponse(res, req, error) {
    return res.status(error.status).json({
        statusCode: error.status,
        message: error['response']['message'],
        timestamp: new Date().toISOString(),
        path: req.url,
    });
}
