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
        return this.prisma.pemeriksaanAPH.findMany(query);
    }
    async createAPH(data) {
        return this.prisma.pemeriksaanAPH.create({
            data
        });
    }
    async updateAPH(id, data) {
        return this.prisma.pemeriksaanAPH.update({
            where: { id: id },
            data: {
                ...data,
                recUpdate: new Date()
            }
        });
    }
    async deleteAPH(id) {
        return this.prisma.pemeriksaanAPH.delete({
            where: { id: id }
        });
    }
    async getById(id) {
        return this.prisma.pemeriksaanAPH.findUnique({
            where: { id: id }
        });
    }
    async SubmitAPH(id, data) {
        return this.prisma.pemeriksaanAPH.update({
            where: { id: id },
            data: {
                ...data,
                status: "menungguVerifikasi",
                isVerified: true,
                dateVerified: new Date()
            }
        });
    }
};
exports.APHService = APHService;
exports.APHService = APHService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], APHService);
//# sourceMappingURL=example.service.js.map