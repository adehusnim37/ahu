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
const pagination_dto_1 = require("../../dto/pagination.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const errors_filter_1 = require("../../filter/errors.filter");
let APHController = class APHController {
    constructor(APHService) {
        this.APHService = APHService;
    }
    async getAll(PaginationDto, res, req) {
        try {
            const userId = req['username'].id;
            const admin = req['username'].role.includes('admin');
            const { pageIndex, pageSize } = PaginationDto;
            const APH = await this.APHService.getAllAPH(admin ? undefined : userId, PaginationDto);
            const totalAPH = await this.APHService.getCountAPH(admin ? undefined : userId);
            console.log(totalAPH);
            const page = {
                count: totalAPH,
                pageIndex: pageIndex,
                pageSize: pageSize,
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
            if (err instanceof common_1.NotFoundException) {
                return (0, errors_filter_1.createErrorResponse404)(res, err.message);
            }
            else if (err instanceof common_1.ConflictException) {
                return (0, errors_filter_1.createErrorResponse400)(res, err.message);
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }
    async getById(id, res, req) {
        try {
            const userId = req['username'].id;
            const admin = req['username'].role.includes('admin');
            const APH = await this.APHService.getById(id, admin ? undefined : userId);
            return res.status(200).json({
                message: 'Data berhasil diambil',
                data: APH,
            });
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                return (0, errors_filter_1.createErrorResponse404)(res, err.message);
            }
            else if (err instanceof common_1.ConflictException) {
                return (0, errors_filter_1.createErrorResponse400)(res, err.message);
            }
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
            if (err instanceof common_1.NotFoundException) {
                return (0, errors_filter_1.createErrorResponse404)(res, err.message);
            }
            else if (err instanceof common_1.ConflictException) {
                return (0, errors_filter_1.createErrorResponse400)(res, err.message);
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }
    async submit(id, res, req) {
        try {
            const userId = req['username'].id;
            const admin = req['username'].role.includes('admin');
            const data = await this.APHService.SubmitAPH(id, admin ? undefined : userId);
            return res.status(201).json({
                message: 'Data berhasil diverifikasi',
                data: data,
            });
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                return (0, errors_filter_1.createErrorResponse404)(res, err.message);
            }
            else if (err instanceof common_1.ConflictException) {
                return (0, errors_filter_1.createErrorResponse400)(res, err.message);
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }
    async update(id, postdata, res, req) {
        try {
            const userId = req['username'].id;
            const admin = req['username'].role.includes('admin');
            const update = await this.APHService.updateAPH(id, postdata, admin ? undefined : userId);
            return res.status(201).json({
                message: 'Data berhasil diupdate',
                data: update,
            });
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                return (0, errors_filter_1.createErrorResponse404)(res, err.message);
            }
            else if (err instanceof common_1.ConflictException) {
                return (0, errors_filter_1.createErrorResponse400)(res, err.message);
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }
    async delete(id, res, req) {
        try {
            const userId = req['username'].id;
            const admin = req['username'].role.includes('admin');
            await this.APHService.deleteAPH(id, admin ? undefined : userId);
            return res.status(204).json({
                message: 'Data berhasil dihapus',
            });
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                return (0, errors_filter_1.createErrorResponse404)(res, err.message);
            }
            else if (err instanceof common_1.ConflictException) {
                return (0, errors_filter_1.createErrorResponse400)(res, err.message);
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }
};
exports.APHController = APHController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
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
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "submit", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createAndUpdate_dto_1.CreateUpdateAphDto, Object, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], APHController.prototype, "delete", null);
exports.APHController = APHController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, common_1.Controller)('api/v1/aph'),
    __metadata("design:paramtypes", [aph_service_1.APHService])
], APHController);
//# sourceMappingURL=aph.controller.js.map