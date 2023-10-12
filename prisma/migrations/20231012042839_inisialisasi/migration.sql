-- AlterTable
ALTER TABLE `pemeriksaanAPH` MODIFY `status` VARCHAR(191) NULL,
    MODIFY `recUpdate` DATETIME(3) NULL,
    MODIFY `dateVerified` DATETIME(3) NULL,
    MODIFY `CatatanTolak` VARCHAR(191) NULL;
