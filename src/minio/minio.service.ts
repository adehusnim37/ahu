import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;
  private static readonly bucketName = 'surat-permohonan';

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      useSSL: process.env.MINIO_USESSL === 'true',
      accessKey: process.env.MINIO_ACCESSKEY,
      secretKey: process.env.MINIO_SECRETKEY,
    });
  }

  async ensureBucketExists(bucketName: string): Promise<void> {
   const bucketExists = await this.minioClient.bucketExists(MinioService.bucketName)
   if (!bucketExists) {
     await this.minioClient.makeBucket(MinioService.bucketName);
   };
  }

  async uploadFile(file: Express.Multer.File , bucketName: string, fileName: string): Promise<string> {
    await this.ensureBucketExists(bucketName);
    const filename = `${fileName}.${file.originalname.split('.').pop()}`;
    await this.minioClient.putObject(bucketName, filename, file.buffer, file.size);
    return filename;
  }

  async getURlFile(bucketName: string, fileName: string): Promise<string> {
    const url = await this.minioClient.presignedUrl('GET', bucketName, fileName);
    return url;
  }
}
