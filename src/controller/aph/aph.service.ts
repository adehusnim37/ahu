import {PrismaService} from "./prisma.service";
import {pemeriksaanAPHModel} from "../../model/aph/aph.model";
import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {Prisma} from "@prisma/client";


@Injectable()
export class APHService {
    constructor(private prisma: PrismaService) {
    }

    async getAllAPH(
        userId: string,
        pageIndex?: number, // optional
        pageSize?: number, // optional
        stringPencarian?: string, // optional
        sortBy?: string, // optional
        isSortAscending?: boolean // optional
    ): Promise<pemeriksaanAPHModel[]> {
        const query: Prisma.pemeriksaanAPHFindManyArgs = {
            where: {
                AND: [
                    {userId: userId},  // Add this
                    {
                        OR: stringPencarian
                            ? [
                                {namaPemohon: {contains: stringPencarian}},
                                {nama_notaris: {contains: stringPencarian}},
                                {recInsert: {equals: isNaN(Date.parse(stringPencarian)) ? undefined : new Date(stringPencarian)}}
                            ]
                            : undefined,
                    }
                ],
            },

            orderBy: sortBy
                ? {
                    [sortBy]: isSortAscending ? 'asc' : 'desc',
                }
                : undefined,
            skip: pageIndex && pageSize ? (pageIndex - 1) * pageSize : undefined, // skip berlaku jika pageIndex dan pageSize ada
            take: pageSize ? parseInt(pageSize.toString(), 10) : undefined, // Take is only available when pageSize is defined
        };

        //if the data length is 0, then return error message
        if ((await this.prisma.pemeriksaanAPH.findMany(query)).length == 0) {
            throw new NotFoundException('Data tidak ditemukan! Silahkan tambah data terlebih dahulu.');
        }

        // Use Prisma Client to fetch the data based on the query
        return this.prisma.pemeriksaanAPH.findMany(query);
    }

    async createAPH(data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel> {
        const conditions = [
            {
                query: {nosurat: data.nosurat},
                errorMessage: 'No surat sudah ada!'
            },
            {
                query: {id: data.id},
                errorMessage: 'ID dokumen sudah ada!'
            }
        ];

        for (const condition of conditions) {
            const existingRecord = await this.prisma.pemeriksaanAPH.findUnique({
                where: condition.query
            });
            if (existingRecord) {
                throw new ConflictException(condition.errorMessage);
            }
        }
        return this.prisma.pemeriksaanAPH.create({
            data
        });
    }

    async updateAPH(id: string, data: pemeriksaanAPHModel, userId): Promise<pemeriksaanAPHModel> {
        const existingRecord = await this.prisma.pemeriksaanAPH.findUnique({
            where: {id: id, userId: userId},
        });

        if (!existingRecord) throw new NotFoundException("Data tidak ditemukan untuk id: " + id);

        if (existingRecord.nosurat) {
            throw new ConflictException('No surat sudah ada!');
        }

        if (existingRecord.isSubmit) {
            throw new ConflictException('Data telah disubmit!');
        }
        return this.prisma.pemeriksaanAPH.update({
            where: {id: id},
            data: {
                ...data,
                recUpdate: new Date()
            }
        });
    }

    async deleteAPH(id: string, userId): Promise<pemeriksaanAPHModel> {
        const existingRecord = await this.prisma.pemeriksaanAPH.findUnique({
            where: {id: id, userId: userId},
        });

        if (!existingRecord) throw new NotFoundException("Data tidak ditemukan untuk id: " + id);

        if (existingRecord.isSubmit) throw new ConflictException('Data telah disubmit & tidak bisa dihapus!');

        return this.prisma.pemeriksaanAPH.delete({
            where: {id: id}
        });
    }

    async getById(id: string, userId): Promise<pemeriksaanAPHModel> {
        // Use Prisma Client to find the single record by id, if the record is not found, throw the NotFoundException
        const APH = await this.prisma.pemeriksaanAPH.findUnique({
            where: {id: id, userId: userId},
        })
        if (!APH) throw new NotFoundException("Data tidak ditemukan untuk id: " + id);
        return APH;
    }

    async SubmitAPH(id: string, userId): Promise<pemeriksaanAPHModel> {
        const existingData = await this.prisma.pemeriksaanAPH.findUnique({
            where: {id: id, userId: userId},
        });

        if (!existingData) throw new ConflictException("Data tidak tersedia untuk id: " + id);

        if (existingData.isSubmit) throw new ConflictException("Data telah disubmit untuk id: " + id);

        existingData.isSubmit = true;
        existingData.recUpdate = new Date();
        existingData.dateSubmit = new Date();
        existingData.status = "draft";

        return this.prisma.pemeriksaanAPH.update({
            where: {id: id},
            data: existingData,
        });
    }

    async getCountAPH(): Promise<number> {
        return this.prisma.pemeriksaanAPH.count();
    }


}