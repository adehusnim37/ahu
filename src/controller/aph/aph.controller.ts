import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Response,
    UseGuards,
    ValidationPipe,
    Request,
} from '@nestjs/common';
import {APHService} from './aph.service';
import {pemeriksaanAPHModel} from "../../model/aph/aph.model";
import {CreateUpdateAphDto} from '../../dto/aph/createAndUpdate.dto';
import {AuthGuard} from "../../auth/jwt-auth.guard";


@UseGuards(AuthGuard)
@Controller('api/v1/aph')
export class APHController {

    constructor(
        private readonly APHService: APHService,
    ) {}

    @Get()
    async getAll(
        @Query('pageIndex') pageIndex: number,
        @Query('pageSize') pageSize: number,
        @Query('stringPencarian') stringPencarian: string,
        @Query('sortBy') sortBy: string,
        @Query('isSortAscending') isSortAscending: boolean,
        @Response() res,
    ): Promise<any> {
        try {
            const APH = await this.APHService.getAllAPH(
                pageIndex ? pageIndex : 1,
                pageSize ? pageSize : 10,
                stringPencarian,
                sortBy,
                isSortAscending,
            );

            const totalAPH = await this.APHService.getCountAPH();

            // if pageIndex and pageSize is not null, then create default pagination pagesize is 10 and pageIndex is 1
            const page = {
                count: totalAPH,
                pageIndex: pageIndex ? pageIndex : 1,
                pageSize: pageSize ? pageSize : 10,
                isFirstPage: pageIndex == 1 ? true : false,
                isLastPage: pageIndex >= Math.ceil(totalAPH / pageSize) ? true : false,
            }
            return res.status(200).json({
                message: 'Data berhasil diambil',
                data: APH,
                page: page,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Response() res): Promise<pemeriksaanAPHModel> {
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
        } catch (err) {
            return res.status(500).json({
                message: 'Data tidak dapat diambil',
                data: err.message,
            });
        }
    }


    @Post()
    async create(@Body(ValidationPipe) postdata: CreateUpdateAphDto, @Request() req: Request, @Response() res): Promise<pemeriksaanAPHModel> {
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
            return res.status(500).json({
                message: 'Data tidak dapat disimpan',
                data: err.message,
            });
        }
    }



    @Post('/submit/:id')
    async submit(
        @Param('id') id: string,
        @Response() res
    ): Promise<pemeriksaanAPHModel> {
        try {
            const data = await this.APHService.SubmitAPH(id);

            return res.status(201).json({
                message: 'Data berhasil diverifikasi',
                data: data,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Data tidak dapat disimpan',
                data: err.message,
            });
        }
    }


    //check if the status is Diterima cannot be updated
    @Put(':id')
    async update(@Param('id') id: string, @Body() postdata: CreateUpdateAphDto, @Response() res): Promise<pemeriksaanAPHModel> {
        try {
            const update = await this.APHService.updateAPH(id, postdata);
            return res.status(201).json({
                message: 'Data berhasil diupdate',
                data: update,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Data tidak dapat diupdate',
                data: err.message,
            });
        }

    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Response() res): Promise<pemeriksaanAPHModel> {
        try {
            await this.APHService.deleteAPH(id);
            return res.status(204).json({
                message: 'Data berhasil dihapus',
            });
        } catch (error) {
            // Handle error appropriately (e.g., record not found)
            return res.status(500).json({
                message: 'Data tidak dapat dihapus',
            });
        }
    }


}
