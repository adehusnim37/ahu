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
exports.APHService = void 0;
const prisma_service_1 = require("./prisma.service");
const common_1 = require("@nestjs/common");
let APHService = class APHService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllAPH(pageIndex, pageSize, stringPencarian, sortBy, isSortAscending) {
        const query = {
            where: {
                OR: stringPencarian
                    ? [
                        { namaPemohon: { contains: stringPencarian } },
                        { nama_notaris: { contains: stringPencarian } },
                        { recInsert: { equals: isNaN(Date.parse(stringPencarian)) ? undefined : new Date(stringPencarian) } },
                    ]
                    : undefined,
            },
            orderBy: sortBy
                ? {
                    [sortBy]: isSortAscending ? 'asc' : 'desc',
                }
                : undefined,
            skip: pageIndex && pageSize ? (pageIndex - 1) * pageSize : undefined,
            take: pageSize ? parseInt(pageSize.toString(), 10) : undefined,
        };
        if ((await this.prisma.pemeriksaanAPH.findMany(query)).length == 0) {
            throw new common_1.NotFoundException('Data tidak ditemukan! Silahkan tambah data terlebih dahulu.');
        }
        return this.prisma.pemeriksaanAPH.findMany(query);
    }
    async createAPH(data) {
        const conditions = [
            {
                query: { nosurat: data.nosurat },
                errorMessage: 'No surat sudah ada!'
            },
            {
                query: { id: data.id },
                errorMessage: 'ID dokumen sudah ada!'
            },
            {
                query: { notaris_id: data.notaris_id },
                errorMessage: 'Notaris ID tidak boleh sama!'
            }
        ];
        for (const condition of conditions) {
            const existingRecord = await this.prisma.pemeriksaanAPH.findUnique({
                where: condition.query
            });
            if (existingRecord) {
                throw new common_1.ConflictException(condition.errorMessage);
            }
        }
        return this.prisma.pemeriksaanAPH.create({
            data
        });
    }
    async updateAPH(id, data) {
        const existingRecord = await this.prisma.pemeriksaanAPH.findUnique({
            where: { id: id },
        });
        if (existingRecord.nosurat) {
            throw new common_1.ConflictException('No surat sudah ada!');
        }
        if (existingRecord.isSubmit) {
            throw new common_1.ConflictException('Data telah disubmit!');
        }
        return this.prisma.pemeriksaanAPH.update({
            where: { id: id },
            data: {
                ...data,
                recUpdate: new Date()
            }
        });
    }
    async deleteAPH(id) {
        const existingRecord = await this.prisma.pemeriksaanAPH.findUnique({
            where: { id: id },
        });
        if (!existingRecord)
            throw new common_1.NotFoundException("Data tidak ditemukan untuk id: " + id);
        if (existingRecord.isSubmit)
            throw new common_1.ConflictException('Data telah disubmit & tidak bisa dihapus!');
        return this.prisma.pemeriksaanAPH.delete({
            where: { id: id }
        });
    }
    async getById(id) {
        const APH = await this.prisma.pemeriksaanAPH.findUnique({
            where: { id: id },
        });
        if (!APH)
            throw new common_1.NotFoundException("Data tidak ditemukan untuk id: " + id);
        return APH;
    }
    async SubmitAPH(id) {
        const existingData = await this.prisma.pemeriksaanAPH.findUnique({
            where: { id: id },
        });
        if (!existingData)
            throw new Error("Data tidak tersedia untuk id: " + id);
        if (existingData.isSubmit)
            throw new Error("Data telah disubmit untuk id: " + id);
        existingData.isSubmit = true;
        existingData.recUpdate = new Date();
        existingData.dateSubmit = new Date();
        existingData.status = "draft";
        return this.prisma.pemeriksaanAPH.update({
            where: { id: id },
            data: existingData,
        });
    }
    async getCountAPH() {
        return this.prisma.pemeriksaanAPH.count();
    }
};
exports.APHService = APHService;
exports.APHService = APHService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], APHService);
//# sourceMappingURL=aph.service.js.map