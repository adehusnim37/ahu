// prisma-exception.filter.ts
import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const message = 'Data tidak dapat disimpan';
        let data = exception.message;
        const status = HttpStatus.INTERNAL_SERVER_ERROR;

        // Handle unique constraint violation
        if (exception.code === 'P2002') {
            data = 'Entry with the provided details already exists.';
        }
        // Add more conditions here for other Prisma error codes if needed.

        response.status(status).json({
            message,
            data,
        });
    }
}
