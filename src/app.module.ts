import { Module } from '@nestjs/common';
import { AphModule } from "./pemeriksaanAPH/user.module";
import { FileUploadController } from './file-upload/file-upload.controller';
import {APHController} from './pemeriksaanAPH/user.controller';
import { MinioClientController } from './minio-client/minio-client.controller';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadService } from './file-upload/file-upload.service';
import { APHService } from './pemeriksaanAPH/user.service';
import { MinioClientService } from './minio-client/minio-client.service';
import { PrismaService } from './pemeriksaanAPH/prisma.service';


@Module({
  imports: [AphModule, FileUploadModule, MinioClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
