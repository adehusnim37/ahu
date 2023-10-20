import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from '../model/external/file-model';
export declare class MinioClientService {
    private readonly minio;
    private readonly logger;
    private readonly baseBucket;
    get client(): import("minio").Client;
    constructor(minio: MinioService);
    upload(file: BufferedFile, baseBucket?: string): Promise<{
        url: string;
    }>;
    delete(objetName: string, baseBucket?: string): Promise<void>;
}
