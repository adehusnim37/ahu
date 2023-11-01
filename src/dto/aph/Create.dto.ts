import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    Length,
    IsEnum,
    IsOptional, IsUUID,
} from "class-validator";
import {Status} from "@prisma/client";
import {IsBeforeEndOfDayToday} from "../../config/date/validateIsToday";
import {Transform, TransformFnParams} from "class-transformer";

export class CreateAphDto {

    @IsOptional()
    @IsUUID('all', { message: 'ID harus valid uuid.' })
    id: string;

    @IsOptional()
    userId: string;

    @IsOptional()
    namaPemohon: string;

    @IsNotEmpty({ message: 'NRP tidak boleh kosong.' })
    @IsString({ message: 'NRP harus berupa string.' })
    NRP: string;

    @IsNotEmpty({ message: 'NRP_File tidak boleh kosong.' })
    @IsString({ message: 'NRP_File harus berupa string.' })
    NRP_File: string;

    @IsPhoneNumber('ID', { message: 'Nomor telepon tidak valid. Harus berupa nomor region indonesia' })
    @IsNotEmpty({ message: 'No Telp tidak boleh kosong.' })
    noTelp: string;

    @IsNotEmpty({ message: 'Email tidak boleh kosong.' })
    @IsEmail({}, { message: 'Format email tidak valid.' })
    email: string;

    @IsString({ message: 'Notaris ID harus berupa string.' })
    @IsNotEmpty({ message: 'Notaris ID tidak boleh kosong.' })
    notaris_id: string;

    @IsOptional()
    @IsString({ message: 'Nama Notaris harus berupa string.' })
    @Length(5, 100, { message: 'Nama Notaris harus antara 5 hingga 100 karakter.' })
    nama_notaris: string;

    @IsOptional()
    @IsString({ message: 'Kedudukan Notaris harus berupa string.' })
    kedudukan_notaris: string;

    @IsOptional()
    @IsString({ message: 'Alamat Notaris harus berupa string.' })
    alamat_notaris: string;

    @IsOptional()
    @IsString({ message: 'No Akta Notaris harus berupa string.' })
    no_akta_notaris: string;

    @IsOptional()
    @IsBeforeEndOfDayToday({ message: 'Tanggal Akta Notaris tidak boleh melebihi hari ini.' })
    tanggal_akta_notaris: Date;

    @IsOptional()
    @IsString({ message: 'Isi Akta harus berupa string.' })
    isi_akta: string;

    @IsNotEmpty({ message: 'Nama Instansi tidak boleh kosong.' })
    @IsString({ message: 'Nama Instansi harus berupa string.' })
    nama_instansi: string;

    @IsNotEmpty({ message: 'Unit Instansi tidak boleh kosong.' })
    unit_instansi: string;

    @IsNotEmpty({ message: 'Jabatan Instansi tidak boleh kosong.' })
    jabatan_instansi: string;

    @IsNotEmpty({ message: 'Alamat Instansi tidak boleh kosong.' })
    @Length(20, 100, { message: 'Alamat Instansi harus antara 20 hingga 100 karakter.' })
    alamat_instansi: string;

    @IsNotEmpty({ message: 'No Surat tidak boleh kosong.' })
    @IsString({ message: 'No Surat harus berupa string.' })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    nosurat: string;

    @IsNotEmpty({ message: 'Tanggal Surat Kuasa tidak boleh kosong.' })
    @IsBeforeEndOfDayToday({ message: 'Tanggal Surat Kuasa tidak boleh melebihi hari ini.' })
    tgl_surat_kuasa: Date;

    @IsOptional()
    surat_permohonan: string;

    @IsOptional()
    bukti_permohonan: string;

    @IsOptional()
    @IsEnum(Status, { message: 'Status tidak valid.' })
    status?: Status;

    @IsOptional()
    isVerified?: boolean;

}