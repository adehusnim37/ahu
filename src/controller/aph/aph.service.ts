import {PrismaService} from "./prisma.service";
import {pemeriksaanAPHModel} from "../../model/aph/aph.model";
import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {PaginationDto} from "../../dto/pagination.dto";
import {Prisma} from "@prisma/client";


@Injectable()
export class APHService {
    constructor(private prisma: PrismaService) {
    }

    async getAllAPH(
        userId: string,
        PaginationDto: PaginationDto,
    ): Promise<pemeriksaanAPHModel[]> {
        const { pageIndex = 1, pageSize = 10, stringPencarian, sortBy, isSortAscending } = PaginationDto;
        const query: Prisma.pemeriksaanAPHFindManyArgs = {
            where: {
                AND: [
                    {userId: userId},  // check if userId is not null or undefined
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

        const unchangeableFields = ['id', 'userId', 'namaPemohon'];
        unchangeableFields.forEach(field => {
            if (data[field]) {
                delete data[field];
            }
        });

        if (!existingRecord) throw new NotFoundException("Data tidak ditemukan untuk id: " + id);

        // If 'nosurat' in the incoming data is different from the existing record
        if (existingRecord.nosurat !== data.nosurat) {
            // Check if there's another record with the same 'nosurat' value
            const isNosuratExisting = await this.prisma.pemeriksaanAPH.findUnique({
                where: { nosurat: data.nosurat }
            });

            if (isNosuratExisting) {
                throw new ConflictException('No surat sudah ada!');
            }
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

    async getCountAPH(userId:string): Promise<number> {
        // count all data if its created by the user
        return this.prisma.pemeriksaanAPH.count({
            where: {userId: userId}
        });
    }


}