import { HttpException } from '@nestjs/common';
export declare class ValidationException extends HttpException {
    constructor(message: string, statusCode: number);
}
