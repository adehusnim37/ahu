-- AlterTable
ALTER TABLE `pemeriksaanAPH` MODIFY `status` ENUM('Menunggu', 'Diterima', 'Ditolak', 'Diproses') NOT NULL DEFAULT 'Menunggu';
