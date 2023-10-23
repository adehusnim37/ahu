import { Module } from '@nestjs/common';
import { AphModule } from "./controller/aph/aph.module";
import { FileUploadModule } from './file-upload/file-upload.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { RateLimiterModule } from './config/rate-limit/rate-limiter.module';


@Module({
  imports: [AphModule, FileUploadModule, MinioClientModule, RateLimiterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
