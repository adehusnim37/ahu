import { PrismaService } from "./prisma.service";
import { pemeriksaanAPHModel } from "../../model/aph/aph.model";
export declare class APHService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllAPH(userId: string, pageIndex?: number, pageSize?: number, stringPencarian?: string, sortBy?: string, isSortAscending?: boolean): Promise<pemeriksaanAPHModel[]>;
    createAPH(data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel>;
    updateAPH(id: string, data: pemeriksaanAPHModel, userId: any): Promise<pemeriksaanAPHModel>;
    deleteAPH(id: string, userId: any): Promise<pemeriksaanAPHModel>;
    getById(id: string, userId: any): Promise<pemeriksaanAPHModel>;
    SubmitAPH(id: string, userId: any): Promise<pemeriksaanAPHModel>;
    getCountAPH(): Promise<number>;
}
