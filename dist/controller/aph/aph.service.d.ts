import { PrismaService } from "./prisma.service";
import { pemeriksaanAPHModel } from "../../model/aph/aph.model";
import { PaginationDto } from "../../dto/pagination.dto";
export declare class APHService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllAPH(userId: string, PaginationDto: PaginationDto): Promise<pemeriksaanAPHModel[]>;
    createAPH(data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel>;
    updateAPH(id: string, data: pemeriksaanAPHModel, userId: any): Promise<pemeriksaanAPHModel>;
    deleteAPH(id: string, userId: any): Promise<pemeriksaanAPHModel>;
    getById(id: string, userId: any): Promise<pemeriksaanAPHModel>;
    SubmitAPH(id: string, userId: any): Promise<pemeriksaanAPHModel>;
    getCountAPH(userId: string): Promise<number>;
}
