import { Body, Controller, Delete, Get, Param, Post, Put, Query, Response, ValidationPipe } from '@nestjs/common';
import { APHService } from './example.service';
import { pemeriksaanAPHModel } from "../../model/example/user.model";
import { CreateUpdateAphDto } from '../../dto/example/createAndUpdate.dto';


@Controller('api/v1/example')
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
      if (aphData.isVerified == true) {
        return res.status(400).json({
          message: 'Data tidak dapat diupdate karena sudah diverifikasi',
        });
      }
      const update = await this.APHService.updateAPH(id, postdata);
      //if example data status is updated from here then the status is still menunggu

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
    } catch (error) {
      // Handle error appropriately (e.g., record not found)
      return res.status(500).json({
        message: 'Record not found',
      });
    }
  }


}
