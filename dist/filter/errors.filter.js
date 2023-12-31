"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorResponse = exports.createErrorResponse404 = exports.createErrorResponse400 = void 0;
function createErrorResponse400(res, message) {
    return res.status(400).json({
        message: `${message}`
    });
}
exports.createErrorResponse400 = createErrorResponse400;
function createErrorResponse404(res, message) {
    return res.status(404).json({
        message: ` ${message}`
    });
}
exports.createErrorResponse404 = createErrorResponse404;
function createErrorResponse(res, req, error) {
    return res.status(error.status).json({
        statusCode: error.status,
        message: error['response']['message'],
        timestamp: new Date().toISOString(),
        path: req.url,
    });
}
exports.createErrorResponse = createErrorResponse;
//# sourceMappingURL=errors.filter.js.map