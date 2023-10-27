"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_exception_filter_1 = require("./config/prisma/prisma-exception.filter");
const common_1 = require("@nestjs/common");
const http_exceptions_filter_1 = require("./filter/http-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
            const result = errors.map((error) => ({
                property: error.property,
                message: error.constraints[Object.keys(error.constraints)[0]],
            }));
            throw new common_1.BadRequestException(result);
        },
        stopAtFirstError: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new http_exceptions_filter_1.HttpExceptionFilter());
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaExceptionFilter());
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map