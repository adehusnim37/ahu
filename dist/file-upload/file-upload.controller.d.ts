import { FileUploadService } from './file-upload.service';
import { BufferedFile } from '../model/external/file-model';
export declare class FileUploadController {
    private fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadSingle(file: BufferedFile): Promise<{
        filename: string;
    }>;
    uploadMany(files: BufferedFile): Promise<{
        image1_url: string;
        image2_url: string;
        message: string;
    }>;
}
