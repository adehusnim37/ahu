import {
    Body, ConflictException,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, Req,
    Response,
    UseGuards,
    ValidationPipe
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
    ) {
    }

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
                pageIndex,
                pageSize,
                stringPencarian,
                sortBy,
                isSortAscending,
            );
            console.log("After fetching data:", APH);
            if (APH.length == 0) {
                return res.status(200).json({
                    message: 'Data tidak ditemukan / kosong',
                });
            }
            const page = {
                count: APH.length,
                pageIndex: pageIndex,
                pageSize: pageSize,
                isFirstPage: pageIndex == 1 ? true : false,
                isLastPage: APH.length < pageSize ? true : false,
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
    async create(@Body(ValidationPipe) postdata: CreateUpdateAphDto, @Response() res): Promise<pemeriksaanAPHModel> {
        try {
            const data = await this.APHService.createAPH(postdata);
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
    async submit(@Param('id') id: string, @Body() postdata: CreateUpdateAphDto, @Response() res): Promise<pemeriksaanAPHModel> {
        try {
            const data = await this.APHService.SubmitAPH(id, postdata);
            if (data.isSubmit == true) {
                return res.status(400).json({
                    message: 'Data tidak dapat diupdate karena sudah diverifikasi',
                });
            }
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
            const aphData = await this.APHService.getById(id);
            // Check if the status is 'Diterima', if yes, return a 400 Bad Request response
            if (aphData.isSubmit == true) {
                return res.status(400).json({
                    message: 'Data tidak dapat diupdate karena sudah diverifikasi',
                });
            }
            const update = await this.APHService.updateAPH(id, postdata);
            //if aph data status is updated from here then the status is still menunggu

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
            const aphData = await this.APHService.getById(id);
            // Check if the status is 'Diterima', if yes, return a 400 Bad Request response
            if (aphData.isSubmit == true) {
                return res.status(400).json({
                    message: 'Data tidak dapat dihapus karena sudah diterima',
                });
            }

            const deleteData = await this.APHService.deleteAPH(id);
            return res.status(200).json({
                message: 'Data berhasil dihapus',
                data: deleteData,
            });
        } catch (error) {
            // Handle error appropriately (e.g., record not found)
            return res.status(500).json({
                message: 'Data tidak dapat dihapus',
            });
        }
    }


}
