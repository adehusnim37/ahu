"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUpdateAphDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const validateIsToday_1 = require("../../config/date/validateIsToday");
class CreateUpdateAphDto {
}
exports.CreateUpdateAphDto = CreateUpdateAphDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Nama Pemohon harus berupa string.' }),
    (0, class_validator_1.Length)(5, 100, { message: 'Nama Pemohon harus antara 5 hingga 100 karakter.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "namaPemohon", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'NRP tidak boleh kosong.' }),
    (0, class_validator_1.IsString)({ message: 'NRP harus berupa string.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "NRP", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'NRP_File tidak boleh kosong.' }),
    (0, class_validator_1.IsString)({ message: 'NRP_File harus berupa string.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "NRP_File", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('ID', { message: 'Nomor telepon tidak valid. Harus berupa nomor region indonesia' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'No Telp tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "noTelp", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email tidak boleh kosong.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Format email tidak valid.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Nama Notaris harus berupa string.' }),
    (0, class_validator_1.Length)(5, 100, { message: 'Nama Notaris harus antara 5 hingga 100 karakter.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "nama_notaris", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Kedudukan Notaris harus berupa string.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "kedudukan_notaris", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Alamat Notaris harus berupa string.' }),
    (0, class_validator_1.Length)(20, 100, { message: 'Alamat Notaris harus antara 20 hingga 100 karakter.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "alamat_notaris", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'No Akta Notaris harus berupa string.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "no_akta_notaris", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validateIsToday_1.IsBeforeEndOfDayToday)({ message: 'Tanggal Surat Kuasa tidak boleh melebihi akhir hari ini.' }),
    __metadata("design:type", Date)
], CreateUpdateAphDto.prototype, "tanggal_akta_notaris", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Isi Akta harus berupa string.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "isi_akta", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nama Instansi tidak boleh kosong.' }),
    (0, class_validator_1.Length)(10, 100, { message: 'Nama Instansi harus antara 10 hingga 100 karakter.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "nama_instansi", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Unit Instansi tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "unit_instansi", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Jabatan Instansi tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "jabatan_instansi", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Alamat Instansi tidak boleh kosong.' }),
    (0, class_validator_1.Length)(20, 100, { message: 'Alamat Instansi harus antara 20 hingga 100 karakter.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "alamat_instansi", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'No Surat tidak boleh kosong.' }),
    (0, class_validator_1.IsString)({ message: 'No Surat harus berupa string.' }),
    (0, class_validator_1.NotContains)(' ', { message: 'No Surat tidak boleh mengandung spasi' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "nosurat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tanggal Surat Kuasa tidak boleh kosong.' }),
    (0, validateIsToday_1.IsBeforeEndOfDayToday)({ message: 'Tanggal Surat Kuasa tidak boleh melebihi akhir hari ini.' }),
    __metadata("design:type", Date)
], CreateUpdateAphDto.prototype, "tgl_surat_kuasa", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Surat Permohonan tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "surat_permohonan", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Bukti Permohonan tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "bukti_permohonan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Status, { message: 'Status tidak valid.' }),
    __metadata("design:type", String)
], CreateUpdateAphDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateUpdateAphDto.prototype, "isVerified", void 0);
//# sourceMappingURL=createAndUpdate.dto.js.map