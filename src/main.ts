import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import { PrismaExceptionFilter } from './config/prisma/prisma-exception.filter';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import {HttpExceptionFilter} from "./filter/http-exceptions.filter";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    // app.enableCors({
    //     origin: '*',
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //     allowedHeaders: 'Content-Type, Accept',
    // })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints[Object.keys(error.constraints)[0]],
                }));
                throw new BadRequestException(result);
            },
            stopAtFirstError: true,
            forbidNonWhitelisted: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('APH Pemeriksaan API')
        .setDescription('Pemeriksaan APH API Documentation')
        .setVersion('1.0')
        .addBearerAuth() // If you have authentication, add this line
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalFilters(new PrismaExceptionFilter());

    await app.listen(4000);
}

bootstrap();
