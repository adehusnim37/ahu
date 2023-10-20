/// <reference types="node" />
import { MimeTypeState } from '../../config/enum/mime-type.enum';
export interface BufferedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: MimeTypeState;
    size: number;
    buffer: Buffer | string;
}
export interface StoredFile extends HasFile, StoredFileMetadata {
}
export interface HasFile {
    file: Buffer | string;
}
export interface StoredFileMetadata {
    id: string;
    name: string;
    encoding: string;
    mimetype: MimeTypeState;
    size: number;
    updatedAt: Date;
    fileSrc?: string;
}
