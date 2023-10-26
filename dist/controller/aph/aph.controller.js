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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APHController = void 0;
const common_1 = require("@nestjs/common");
const aph_service_1 = require("./aph.service");
const createAndUpdate_dto_1 = require("../../dto/aph/createAndUpdate.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let APHController = class APHController {
    constructor(APHService) {
        this.APHService = APHService;
    }
    async getAll(pageIndex, pageSize, stringPencarian, sortBy, isSortAscending, res) {
        try {
            const APH = await this.APHService.getAllAPH(pageIndex ? pageIndex : 1, pageSize ? pageSize : 10, stringPencarian, sortBy, isSortAscending);
            const totalAPH = await this.APHService.getCountAPH();
            const page = {
                count: totalAPH,
                pageIndex: pageIndex ? pageIndex : 1,
                pageSize: pageSize ? pageSize : 10,
                isFirstPage: pageIndex == 1 ? true : false,
                isLastPage: pageIndex >= Math.ceil(totalAPH / pageSize) ? true : false,
            };
            return res.status(200).json({
                message: 'Data berhasil diambil',
                data: APH,
                page: page,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }
    async getById(id, res) {
        try {
            const APH = await this.APHService.getById(id);
            if (!APH) {
                return res.status(404).json({
                    message: 'Data tidak ditemukan',
                });
            }
            return res.status(200).json({
                message: 'Data berhasil diambil',
                data: APH,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }
    async create(postdata, req, res) {
        try {
            const userId = req['username'].id;
            const namaPemohon = req['username'].nama;
            console.log(userId, namaPemohon);
            const data = await this.APHService.createAPH({
                ...postdata,
                userId: userId,
                namaPemohon: namaPemohon,
            });
            return res.status(201).json({
                message: 'Data berhasil ditambahkan',
                data: data,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Data tidak dapat disimpan',
                data: err.message,
            });
        }
    }
    async submit(id, res) {
        try {
            const data = await this.APHService.SubmitAPH(id);
            return res.status(201).json({
                message: 'Data berhasil diverifikasi',
                data: data,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Data tidak dapat disimpan',
                data: err.message,
            });
        }
    }
    async update(id, postdata, res) {
        try {
            const update = await this.APHService.updateAPH(id, postdata);
            return res.status(201).json({
                message: 'Data berhasil diupdate',
                data: update,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Data tidak dapat diupdate',
                data: err.message,
            });
        }
    }
    async delete(id, res) {
        try {
            await this.APHService.deleteAPH(id);
            return res.status(204).json({
                message: 'Data berhasil dihapus',
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Data tidak dapat dihapus',
            });
        }
    }
};
exports.APHController = APHController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('pageIndex')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('stringPencarian')),
    __param(3, (0, common_1.Query)('sortBy')),
    __param(4, (0, common_1.Query)('isSortAscending')),
    __param(5, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAndUpdate_dto_1.CreateUpdateAphDto, Object, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/submit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "submit", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createAndUpdate_dto_1.CreateUpdateAphDto, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "delete", null);
exports.APHController = APHController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, common_1.Controller)('api/v1/aph'),
    __metadata("design:paramtypes", [aph_service_1.APHService])
], APHController);
//# sourceMappingURL=aph.controller.js.map