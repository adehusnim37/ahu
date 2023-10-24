import { HttpException } from '@nestjs/common';

export class ValidationException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }
}
