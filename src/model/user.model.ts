import { Prisma, Status } from "@prisma/client";

export class pemeriksaanAPHModel implements Prisma.pemeriksaanAPHCreateInput {

  userId: string;
  namaPemohon: string;
  NRP: string;
  NRP_File: string;
  noTelp: string;
  email: string;
  notaris_id?: string;
  nama_notaris: string;
  kedudukan_notaris: string;
  alamat_notaris: string;
  no_akta_notaris: string;
  tanggal_akta_notaris: Date;
  isi_akta: string;
  nama_instansi: string;
  unit_instansi: string;
  jabatan_instansi: string;
  alamat_instansi: string;
  nosurat: string;
  tgl_surat_kuasa: Date;
  surat_permohonan: string;
  bukti_permohonan: string;
  status?: Status;
  recInsert?: Date;
  recUpdate?: Date;
  isVerified?: boolean;
  dateVerified?: Date;
  CatatanTolak?: string
  isSubmit?: boolean;
}


