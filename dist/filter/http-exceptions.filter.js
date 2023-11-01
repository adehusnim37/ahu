"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const errorMessageTranslations = {
    'Forbidden resource': 'Sumber daya dilarang untuk diakses',
    'Bad Request': 'Permintaan Buruk',
    'Internal Server Error': 'Kesalahan Server Internal',
    'Not Found': 'Tidak Ditemukan',
    'Unauthorized': 'Tidak Sah',
    'OK': 'Baik',
};
const translateMessage = (message) => {
    return errorMessageTranslations[message] || message;
};
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const defaultMessage = response.statusMessage;
        const message = exception.getResponse()['message'] || defaultMessage;
        response.status(status).json({
            statusCode: status,
            message: translateMessage(message),
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
//# sourceMappingURL=http-exceptions.filter.js.map