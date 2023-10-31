import { Module } from '@nestjs/common';
import { AphModule } from "./controller/aph/aph.module";
import { FileUploadModule } from './file-upload/file-upload.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { RateLimiterModule } from './rate-limit/rate-limiter.module';
import {AuthModule} from "./auth/auth.module";
import {AuthGuard} from "./auth/jwt-auth.guard";
import {APP_GUARD} from "@nestjs/core";


@Module({
  imports: [AphModule, FileUploadModule, MinioClientModule, RateLimiterModule, AuthModule],
  controllers: [],
  providers: [
    {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
