import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, IsEnum, IsOptional, IsBoolean } from "class-validator";
import {Status} from "@prisma/client";

export class CreateUpdateAphDto {

  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Length(5,100)
  namaPemohon: string;

  @IsNotEmpty()
  @IsString()
  NRP: string;

  @IsNotEmpty()
  @IsString()
  NRP_File: string;

  @IsPhoneNumber('ID')
  noTelp: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5,100)
  nama_notaris: string;

  @IsNotEmpty()
  kedudukan_notaris: string;

  @IsNotEmpty()
  @Length(20,100)
  alamat_notaris: string;

  @IsNotEmpty()
  no_akta_notaris: string;

  @IsNotEmpty()
  tanggal_akta_notaris: Date;

  @IsNotEmpty()
  isi_akta: string;

  @Length(10,100)
  @IsNotEmpty()
  nama_instansi: string;

  @IsNotEmpty()
  unit_instansi: string;

  @IsNotEmpty()
  jabatan_instansi: string;

  @Length(20,100)
  @IsNotEmpty()
  alamat_instansi: string;

  @IsNotEmpty()
  nosurat: string;

  @IsNotEmpty()
  tgl_surat_kuasa: Date;

  @IsNotEmpty()
  surat_permohonan: string;

  @IsNotEmpty()
  bukti_permohonan: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  isVerified?: boolean;

}