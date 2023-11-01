import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Translation map for English to Indonesian
const errorMessageTranslations: { [key: string]: string } = {
    'Forbidden resource': 'Sumber daya dilarang untuk diakses',
    'Bad Request': 'Permintaan Buruk',
    'Internal Server Error': 'Kesalahan Server Internal',
    'Not Found': 'Tidak Ditemukan',
    'Unauthorized': 'Tidak Sah',
    'OK': 'Baik',
    // ... add other translations as needed
};

// This function translates English messages to Indonesian
const translateMessage = (message: string): string => {
    return errorMessageTranslations[message] || message;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        // Use NestJS's response object to get the default message for the status code
        const defaultMessage = response.statusMessage;

        // If a custom message isn't provided, use the default message for the status code
        const message = exception.getResponse()['message'] || defaultMessage;

        response.status(status).json({
            statusCode: status,
            message: translateMessage(message),
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
