"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
class ValidationException extends common_1.HttpException {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation-exception.filter.js.map