import { Body, Controller, Delete, Get, Param, Patch, Post, Response, ValidationPipe } from "@nestjs/common";
import { APHService } from "./user.service";
import { pemeriksaanAPHModel } from "./user.model";

@Controller("api/v1/aph")
export class APHController {

  constructor(private readonly APHService: APHService) {
  }

  @Get()
  async getAllAPH(@Response() res): Promise<pemeriksaanAPHModel[]> {
    try {
      const APH = await this.APHService.getAllAPH();
      return res.status(200).json({
        count: APH.length,
        message: "Data berhasil diambil",
        data: APH

      });
    } catch (err) {
      return res.status(500).json({
        message: "Data tidak dapat diambil",
        data: err.message
      });
    }

  }

  @Post()
  async createAPH(@Body(ValidationPipe) postdata: pemeriksaanAPHModel, @Response() res): Promise<pemeriksaanAPHModel> {
    try {
      const data = await this.APHService.createAPH(postdata);
      return res.status(201).json({
        message: "Data berhasil ditambahkan",
        data: data
      });
    } catch (err) {
      return res.status(500).json({
        message: "Data tidak dapat disimpan",
        data: err.message
      });
    }
  }

  @Post("/submit/:id")
  async submitAPH(@Param("id") id: string, @Body() postdata: pemeriksaanAPHModel, @Response() res ): Promise<pemeriksaanAPHModel> {
    try {
      const data = await this.APHService.SubmitAPH(id, postdata);
      return res.status(201).json({
        message: "Data berhasil diverifikasi",
        data: data
      });
    } catch (err) {
      return res.status(500).json({
        message: "Data tidak dapat disimpan",
        data: err.message
      });
    }
  }

  //check if the status is Diterima cannot be updated
  @Patch(":id")
  async updateAPH(@Param("id") id: string, @Body() postdata: pemeriksaanAPHModel, @Response() res): Promise<pemeriksaanAPHModel> {
    const aphData = await this.APHService.getById(id);
    // Check if the status is 'Diterima', if yes, return a 400 Bad Request response
    if (aphData.isVerified == true) {
      return res.status(400).json({
        message: "Data tidak dapat diupdate karena sudah diverifikasi"
      });
    }
    const update = await this.APHService.updateAPH(id, postdata);
    //if aph data status is updated from here then the status is still menunggu

    return res.status(201).json({
      message: "Data berhasil diupdate",
      data: update
    });
  }

  @Delete(":id")
  async deleteAPH(@Param("id") id: string, @Response() res): Promise<pemeriksaanAPHModel> {
    try {
      const aphData = await this.APHService.getById(id);
      // Check if the status is 'Diterima', if yes, return a 400 Bad Request response
      if (aphData.isVerified == true) {
        return res.status(400).json({
          message: "Data tidak dapat dihapus karena sudah diterima"
        });
      }

      const deleteData = await this.APHService.deleteAPH(id);
      return res.status(200).json({
        message: "Data berhasil dihapus",
        data: deleteData
      });
    } catch (error) {
      // Handle error appropriately (e.g., record not found)
      return res.status(500).json({
        message: "Record not found"
      });
    }
  }

}