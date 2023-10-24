-- AlterTable
ALTER TABLE `pemeriksaanAPH` MODIFY `namaPemohon` VARCHAR(191) NULL,
    MODIFY `nama_notaris` VARCHAR(191) NULL,
    MODIFY `kedudukan_notaris` VARCHAR(191) NULL,
    MODIFY `alamat_notaris` VARCHAR(191) NULL,
    MODIFY `no_akta_notaris` VARCHAR(191) NULL,
    MODIFY `tanggal_akta_notaris` DATETIME(3) NULL;
