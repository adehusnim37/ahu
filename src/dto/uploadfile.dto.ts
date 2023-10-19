import { IsNotEmpty, IsString } from 'class-validator';
export class UploadfileDto{
  @IsNotEmpty()
  @IsString()
  surat_permohonan_url: string;

  @IsNotEmpty()
  @IsString()
  bukti_permohonan_url: string;
}