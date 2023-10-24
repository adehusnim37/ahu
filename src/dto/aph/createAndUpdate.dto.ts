import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    Length,
    IsEnum,
    IsOptional, NotContains, MaxDate,
} from "class-validator";
import {Status} from "@prisma/client";

export class CreateUpdateAphDto {

    @IsOptional()
    userId: string;

    @IsOptional()
    @IsString()
    @Length(5, 100)
    namaPemohon: string;

    @IsNotEmpty()
    @IsString()
    NRP: string;

    @IsNotEmpty()
    @IsString()
    NRP_File: string;

    @IsPhoneNumber('ID')
    @IsNotEmpty()
    noTelp: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(5, 100)
    @IsOptional()
    nama_notaris: string;

    @IsOptional()
    @IsString()
    kedudukan_notaris: string;

    @IsOptional()
    @IsString()
    @Length(20, 100)
    alamat_notaris: string;

    @IsString()
    @IsOptional()
    no_akta_notaris: string;

    @IsOptional()
    @MaxDate(new Date())
    tanggal_akta_notaris: Date;

    @IsOptional()
    @IsString()
    isi_akta: string;

    @Length(10, 100)
    @IsNotEmpty()
    nama_instansi: string;

    @IsNotEmpty()
    unit_instansi: string;

    @IsNotEmpty()
    jabatan_instansi: string;

    @Length(20, 100)
    @IsNotEmpty()
    alamat_instansi: string;

    @IsNotEmpty()
    @IsString()
    @NotContains(' ', {message: 'No Surat tidak boleh mengandung spasi'})
    nosurat: string;

    @IsNotEmpty()
    @MaxDate(new Date())
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