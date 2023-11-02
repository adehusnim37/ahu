-- CreateTable
CREATE TABLE `pemeriksaanAPH` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `namaPemohon` VARCHAR(191) NOT NULL,
    `NRP` VARCHAR(191) NOT NULL,
    `NRP_File` VARCHAR(191) NOT NULL,
    `noTelp` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `notaris_id` VARCHAR(191) NOT NULL,
    `nama_notaris` VARCHAR(191) NULL,
    `kedudukan_notaris` VARCHAR(191) NULL,
    `alamat_notaris` VARCHAR(191) NULL,
    `no_akta_notaris` VARCHAR(191) NULL,
    `tanggal_akta_notaris` DATETIME(3) NULL,
    `isi_akta` VARCHAR(191) NULL,
    `nama_instansi` VARCHAR(191) NOT NULL,
    `unit_instansi` VARCHAR(191) NOT NULL,
    `jabatan_instansi` VARCHAR(191) NOT NULL,
    `alamat_instansi` VARCHAR(191) NOT NULL,
    `nosurat` VARCHAR(191) NOT NULL,
    `tgl_surat_kuasa` DATETIME(3) NOT NULL,
    `surat_permohonan` VARCHAR(191) NULL,
    `bukti_permohonan` VARCHAR(191) NULL,
    `status` ENUM('draft', 'menungguVerifikasi', 'diterima') NOT NULL DEFAULT 'draft',
    `recInsert` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `recUpdate` DATETIME(3) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `dateVerified` DATETIME(3) NULL,
    `CatatanTolak` VARCHAR(191) NULL,
    `isSubmit` BOOLEAN NOT NULL DEFAULT false,
    `dateSubmit` DATETIME(3) NULL,

    UNIQUE INDEX `pemeriksaanAPH_nosurat_key`(`nosurat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;