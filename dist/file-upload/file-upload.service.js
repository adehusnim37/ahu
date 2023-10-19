"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const minio_client_service_1 = require("../minio-client/minio-client.service");
let FileUploadService = class FileUploadService {
    constructor(minioClientService) {
        this.minioClientService = minioClientService;
    }
    async uploadSingle(image) {
        const uploaded_image = await this.minioClientService.upload(image);
        return {
            filename: uploaded_image.url,
        };
    }
    async uploadMany(files) {
        const image1 = files['image1'][0];
        const uploaded_image1 = await this.minioClientService.upload(image1);
        const image2 = files['image2'][0];
        const uploaded_image2 = await this.minioClientService.upload(image2);
        return {
            image1_url: uploaded_image1.url,
            image2_url: uploaded_image2.url,
            message: 'Successfully uploaded mutiple image on MinioS3',
        };
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [minio_client_service_1.MinioClientService])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map