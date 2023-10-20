import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from '../model/external/file-model';
export declare class FileUploadService {
    private minioClientService;
    constructor(minioClientService: MinioClientService);
    uploadSingle(image: BufferedFile): Promise<{
        filename: string;
    }>;
    uploadMany(files: BufferedFile): Promise<{
        image1_url: string;
        image2_url: string;
        message: string;
    }>;
}
