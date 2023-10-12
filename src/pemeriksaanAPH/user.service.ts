import { PrismaService } from "./prisma.service";
import { pemeriksaanAPHModel } from "./user.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class APHService {
  constructor(private prisma: PrismaService) {
  }

  async getAllAPH(): Promise<pemeriksaanAPHModel[]> {
    return this.prisma.pemeriksaanAPH.findMany();
  }

  async createAPH(data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel> {
    return this.prisma.pemeriksaanAPH.create({
      data
    });
  }

  async updateAPH(id: string, data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel> {
    return this.prisma.pemeriksaanAPH.update({
      where: { id: id },
      data : {
        ...data,
        recUpdate: new Date(),
      }
    });
  }

  async deleteAPH(id: string): Promise<pemeriksaanAPHModel> {
    return this.prisma.pemeriksaanAPH.delete({
      where: { id: id }
    });
  }

  async getById(id: string): Promise<pemeriksaanAPHModel> {
    return this.prisma.pemeriksaanAPH.findUnique({
      where: { id: id }
    });
  }

  async SubmitAPH(id: string, data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel> {
    return this.prisma.pemeriksaanAPH.update({
      where: { id: id },
      data: {
        ...data,
        status: 'Diproses',
        isVerified: true,
        dateVerified: new Date(),
      }
    });
  }
}