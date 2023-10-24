"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_exception_filter_1 = require("./config/prisma/prisma-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept',
    });
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaExceptionFilter());
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map