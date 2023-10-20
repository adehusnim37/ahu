import { Module } from '@nestjs/common';
import { AphModule } from "./controller/example/example.module";
import { FileUploadController } from './file-upload/file-upload.controller';
import {APHController} from './controller/example/example.controller';
import { MinioClientController } from './minio-client/minio-client.controller';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadService } from './file-upload/file-upload.service';
import { APHService } from './controller/example/example.service';
import { MinioClientService } from './minio-client/minio-client.service';
import { PrismaService } from './controller/example/prisma.service';


@Module({
  imports: [AphModule, FileUploadModule, MinioClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
