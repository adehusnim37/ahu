import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import { PrismaExceptionFilter } from './config/prisma/prisma-exception.filter';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept',
    })

    app.useGlobalFilters(new PrismaExceptionFilter());

    await app.listen(4000);
}

bootstrap();
