import { PrismaService } from "./prisma.service";
import { pemeriksaanAPHModel } from "../../model/example/user.model";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";


@Injectable()
export class APHService {
  constructor(private prisma: PrismaService) {
  }

  async getAllAPH(
    pageIndex?: number, // optional
    pageSize?: number, // optional
    stringPencarian?: string, // optional
    sortBy?: string, // optional
    isSortAscending?: boolean // optional
  ): Promise<pemeriksaanAPHModel[]> {
    const query: Prisma.pemeriksaanAPHFindManyArgs = {
      where: {
        OR: stringPencarian
          ? [
            { namaPemohon: { contains: stringPencarian } },
            { nama_notaris: { contains: stringPencarian } },
            // if the recInsert is included in the search string, then convert the string to Date object then search
            { recInsert: { equals: isNaN(Date.parse(stringPencarian)) ? undefined : new Date(stringPencarian) } }, // jika stringPencarian gabisa di convert ke tanggal maka undefined, jika bisa maka convert ke tanggal lalu cari
          ]
          : undefined,
      },
      orderBy: sortBy
        ? {
          [sortBy]: isSortAscending ? 'asc' : 'desc',
        }
        : undefined,
      skip: pageIndex && pageSize ? (pageIndex - 1) * pageSize : undefined, // skip berlaku jika pageIndex dan pageSize ada
      take: pageSize ? parseInt(pageSize.toString(), 10) : undefined, // Take is only available when pageSize is defined
    };

    // Use Prisma Client to fetch the data based on the query
    return this.prisma.pemeriksaanAPH.findMany(query);
  }

  async createAPH(data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel> {
    return this.prisma.pemeriksaanAPH.create({
      data
    });
  }

  async updateAPH(id: string, data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel> {
    return this.prisma.pemeriksaanAPH.update({
      where: { id: id },
      data: {
        ...data,
        recUpdate: new Date()
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
        status: "menungguVerifikasi",
        isVerified: true,
        dateVerified: new Date()
      }
    });
  }
}