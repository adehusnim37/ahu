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
const user_service_1 = require("./user.service");
const createAndUpdate_dto_1 = require("../../dto/createAndUpdate.dto");
let APHController = class APHController {
    constructor(APHService) {
        this.APHService = APHService;
    }
    async getAllAPH(pageIndex, pageSize, stringPencarian, sortBy, isSortAscending, res) {
        try {
            const APH = await this.APHService.getAllAPH(pageIndex, pageSize, stringPencarian, sortBy, isSortAscending);
            if (APH.length == 0) {
                return res.status(200).json({
                    message: 'Data tidak ditemukan / kosong',
                });
            }
            return res.status(200).json({
                count: APH.length,
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
    async getAPHById(id, res) {
        try {
            const APH = await this.APHService.getById(id);
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
    async createAPH(postdata, res) {
        try {
            const data = await this.APHService.createAPH(postdata);
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
    async submitAPH(id, postdata, res) {
        try {
            const data = await this.APHService.SubmitAPH(id, postdata);
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
    async updateAPH(id, postdata, res) {
        try {
            const aphData = await this.APHService.getById(id);
            if (aphData.isVerified == true) {
                return res.status(400).json({
                    message: 'Data tidak dapat diupdate karena sudah diverifikasi',
                });
            }
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
    async deleteAPH(id, res) {
        try {
            const aphData = await this.APHService.getById(id);
            if (aphData.isVerified == true) {
                return res.status(400).json({
                    message: 'Data tidak dapat dihapus karena sudah diterima',
                });
            }
            const deleteData = await this.APHService.deleteAPH(id);
            return res.status(200).json({
                message: 'Data berhasil dihapus',
                data: deleteData,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Record not found',
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
], APHController.prototype, "getAllAPH", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "getAPHById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAndUpdate_dto_1.CreateUpdateAphDto, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "createAPH", null);
__decorate([
    (0, common_1.Post)('/submit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createAndUpdate_dto_1.CreateUpdateAphDto, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "submitAPH", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createAndUpdate_dto_1.CreateUpdateAphDto, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "updateAPH", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "deleteAPH", null);
exports.APHController = APHController = __decorate([
    (0, common_1.Controller)('api/v1/example'),
    __metadata("design:paramtypes", [user_service_1.APHService])
], APHController);
//# sourceMappingURL=user.controller.js.map