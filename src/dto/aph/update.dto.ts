import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {IsBeforeEndOfDayToday} from "../../config/date/validateIsToday";
import {Status} from "@prisma/client";

export class UpdatePemeriksaanAPHDto {
    readonly id: string;
    readonly userId: string;
    readonly namaPemohon: string;

    @IsNotEmpty({ message: 'NRP tidak boleh kosong.' })
    @IsString({ message: 'NRP harus berupa string.' })
    NRP: string;

    @IsNotEmpty({ message: 'NRP_File tidak boleh kosong.' })
    @IsString({ message: 'NRP_File harus berupa string.' })
    NRP_File: string;

    @IsNotEmpty({ message: 'noTelp tidak boleh kosong.' })
    @IsString({ message: 'noTelp harus berupa string.' })
    noTelp: string;

    @IsNotEmpty({ message: 'email tidak boleh kosong.' })
    @IsEmail({}, { message: 'Format email tidak valid.' })
    email: string;

    @IsNotEmpty({ message: 'nama_notaris tidak boleh kosong.' })
    @IsString({ message: 'nama_notaris harus berupa string.' })
    nama_notaris: string;

    @IsNotEmpty({ message: 'kedudukan_notaris tidak boleh kosong.' })
    @IsString({ message: 'kedudukan_notaris harus berupa string.' })
    kedudukan_notaris: string;

    @IsNotEmpty({ message: 'alamat_notaris tidak boleh kosong.' })
    @IsString({ message: 'alamat_notaris harus berupa string.' })
    alamat_notaris: string;

    @IsNotEmpty({ message: 'notaris_id tidak boleh kosong.' })
    //@IsUUID('all', { message: 'notaris_id harus valid uuid.' })
    notaris_id: string;

    @IsNotEmpty({ message: 'no_akta_notaris tidak boleh kosong.' })
    @IsString({ message: 'no_akta_notaris harus berupa string.' })
    no_akta_notaris: string;

    @IsNotEmpty({ message: 'Tanggal Surat Kuasa tidak boleh kosong.' })
    @IsBeforeEndOfDayToday({ message: 'Tanggal Surat Kuasa tidak boleh melebihi hari ini.' })
    tanggal_akta_notaris: Date;

    @IsNotEmpty({ message: 'isi_akta tidak boleh kosong.' })
    @IsString({ message: 'isi_akta harus berupa string.' })
    isi_akta: string;

    @IsNotEmpty({ message: 'nama_instansi tidak boleh kosong.' })
    @IsString({ message: 'nama_instansi harus berupa string.' })
    nama_instansi: string;

    @IsNotEmpty({ message: 'unit_instansi tidak boleh kosong.' })
    @IsString({ message: 'unit_instansi harus berupa string.' })
    unit_instansi: string;

    @IsNotEmpty({ message: 'jabatan_instansi tidak boleh kosong.' })
    @IsString({ message: 'jabatan_instansi harus berupa string.' })
    jabatan_instansi: string;

    @IsNotEmpty({ message: 'alamat_instansi tidak boleh kosong.' })
    @IsString({ message: 'alamat_instansi harus berupa string.' })
    alamat_instansi: string;

    @IsNotEmpty({ message: 'nosurat tidak boleh kosong.' })
    @IsString({ message: 'nosurat harus berupa string.' })
    nosurat: string;

    @IsNotEmpty({ message: 'Tanggal Surat Kuasa tidak boleh kosong.' })
    @IsBeforeEndOfDayToday({ message: 'Tanggal Surat Kuasa tidak boleh melebihi hari ini.' })
    tgl_surat_kuasa: Date;

    readonly surat_permohonan: string;
    readonly bukti_permohonan: string;
    readonly recInsert: Date;
    readonly status: Status;
    readonly isVerified: boolean;
    readonly dateVerified: Date;
    readonly CatatanTolak: string;
    readonly isSubmit: boolean;

}
