import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put, Query,
    Request,
    Response, UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import {APHService} from './aph.service';
import {pemeriksaanAPHModel} from "../../model/aph/aph.model";
import {CreateAphDto} from '../../dto/aph/Create.dto';
import {PaginationDto} from "../../dto/pagination.dto";
import {createErrorResponse400, createErrorResponse404} from "../../filter/errors.filter";
import {RolesGuard} from "../../auth/role/role.guard";
import {Roles} from "../../auth/role/role.decorator";
import {Role} from "../../config/enum/role.enum";
import {UpdatePemeriksaanAPHDto} from "../../dto/aph/update.dto";



@UseGuards( RolesGuard)
@Roles(Role.Notaris)
@Controller('api/v1/aph')
export class APHController {

    constructor(
        private readonly APHService: APHService,
    ) {
    }

    @Get()
    async getAll(
        @Query() PaginationDto: PaginationDto,
        @Response() res,
        @Request() req: Request,
    ): Promise<any> {
        try {
            const userId = req['username'].id;
            console.log('before get all aph');
            const { pageIndex, pageSize } = PaginationDto;
            const APH = await this.APHService.getAllAPH(
                 userId,
                PaginationDto,
            );
            console.log('after get all aph');

            const totalAPH = await this.APHService.getCountAPH( userId);
            console.log(totalAPH);

            // if pageIndex and pageSize is not null, then create default pagination pagesize is 10 and pageIndex is 1
            const page = {
                count: totalAPH,
                pageIndex: pageIndex,
                pageSize: pageSize,
                isFirstPage: pageIndex == 1 ? true : false,
                isLastPage: pageIndex >= Math.ceil(totalAPH / pageSize) ? true : false,
            }
            return res.status(200).json({
                message: 'Data berhasil diambil',
                data: APH,
                page: page,
            });
        } catch (err) {
            if (err instanceof NotFoundException) {
                return createErrorResponse404(res, err.message)
            } else if (err instanceof ConflictException) {
                return createErrorResponse400(res, err.message)
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Response() res, @Request() req: Request): Promise<pemeriksaanAPHModel> {
        try {
            const userId = req['username'].id;
            // if the role is admin then the user can access all data
            const admin = req['username'].role.includes('admin');
            const APH = await this.APHService.getById(id, admin ? undefined : userId);
            return res.status(200).json({
                message: 'Data berhasil diambil',
                data: APH,
            });
        } catch (err) {
            if (err instanceof NotFoundException) {
                return createErrorResponse404(res, err.message)
            } else if (err instanceof ConflictException) {
                return createErrorResponse400(res, err.message)
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }


    @Post()
    async create(@Body(ValidationPipe) postdata: CreateAphDto, @Request() req: Request, @Response() res): Promise<pemeriksaanAPHModel> {
        try {
            // Extract user data from the request object
            const userId = req['username'].id;
            const namaPemohon = req['username'].nama;

            console.log(userId, namaPemohon);

            // TODO: Use the userId and userName as required in your logic

            const data = await this.APHService.createAPH({
                ...postdata,
                userId: userId,
                namaPemohon: namaPemohon,
            });

            return res.status(201).json({
                message: 'Data berhasil ditambahkan',
                data: data,
            });
        } catch (err) {
            if (err instanceof NotFoundException) {
                return createErrorResponse404(res, err.message)
            } else if (err instanceof ConflictException) {
                return createErrorResponse400(res, err.message)
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }


    @Post('/submit/:id')
    async submit(
        @Param('id') id: string,
        @Response() res,
        @Request() req: Request
    ): Promise<pemeriksaanAPHModel> {
        try {
            const userId = req['username'].id;
            const admin = req['username'].role.includes('admin');
            const data = await this.APHService.SubmitAPH(id, admin ? undefined : userId);

            return res.status(201).json({
                message: 'Data berhasil diverifikasi',
                data: data,
            });
        } catch (err) {
            if (err instanceof NotFoundException) {
                return createErrorResponse404(res, err.message)
            } else if (err instanceof ConflictException) {
                return createErrorResponse400(res, err.message)
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }


    //check if the status is Diterima cannot be updated
    @Put(':id')
    async update(@Param('id') id: string, @Body() postdata: UpdatePemeriksaanAPHDto, @Response() res, @Request() req: Request): Promise<pemeriksaanAPHModel> {
        try {
            const userId = req['username'].id;
            const admin = req['username'].role.includes('admin');
            const update = await this.APHService.updateAPH(id, postdata, admin ? undefined : userId);
            return res.status(201).json({
                message: 'Data berhasil diupdate',
                data: update,
            });
        } catch (err) {
            if (err instanceof NotFoundException) {
                return createErrorResponse404(res, err.message)
            } else if (err instanceof ConflictException) {
                return createErrorResponse400(res, err.message)
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }

    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Response() res, @Request() req: Request): Promise<pemeriksaanAPHModel> {
        try {
            const userId = req['username'].id;
            const admin = req['username'].role.includes('admin');
            await this.APHService.deleteAPH(id, admin ? undefined : userId);
            return res.status(204).json({
                message: 'Data berhasil dihapus',
            });
        } catch (err) {
            if (err instanceof NotFoundException) {
                return createErrorResponse404(res, err.message)
            } else if (err instanceof ConflictException) {
                return createErrorResponse400(res, err.message)
            }
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }


}
