import { Body, Controller, Delete, Get, Param, Post, Put, Response, ValidationPipe } from "@nestjs/common";
import { APHService } from "./user.service";
import { pemeriksaanAPHModel } from "./user.model";

@Controller("api/v1/aph")
export class APHController {

  constructor(private readonly APHService: APHService) {
  }

  @Get()
  async getAllAPH(@Response() res) : Promise<pemeriksaanAPHModel[]> {
    const APH = await this.APHService.getAllAPH();
    return res.status(200).json({
      count: APH.length,
      message: "Data berhasil diambil",
      data: APH,

    })
  }

  @Post()
  async createAPH(@Body(ValidationPipe) postdata: pemeriksaanAPHModel, @Response() res): Promise<pemeriksaanAPHModel> {
   const data = await this.APHService.createAPH(postdata);
    return res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: data,
    })
  }

  @Put(":id")
  async updateAPH(@Param('id') id:string ,@Body()  postdata: pemeriksaanAPHModel,@Response() res): Promise<pemeriksaanAPHModel> {
    const update =  await this.APHService.updateAPH(id, postdata);
    return res.status(201).json({
      message: "Data berhasil diupdate",
      data: update,
    })
  }

  @Delete(":id")
  async deleteAPH(@Param('id') id:string,@Response() res): Promise<pemeriksaanAPHModel> {
    const deleteData = await this.APHService.deleteAPH(id);
    return res.status(200).json({
      message: "Data berhasil dihapus",
      data: deleteData,
    })
  }

}
