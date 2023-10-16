import { Module } from '@nestjs/common';
import { AphModule } from "./pemeriksaanAPH/user.module";
import { MinioService } from './minio/minio.service';

@Module({
  imports: [AphModule],
  controllers: [],
  providers: [MinioService],
})
export class AppModule {}
