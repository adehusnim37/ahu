import { PrismaService } from "./prisma.service";
import { pemeriksaanAPHModel } from "../../model/example/user.model";
export declare class APHService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllAPH(pageIndex?: number, pageSize?: number, stringPencarian?: string, sortBy?: string, isSortAscending?: boolean): Promise<pemeriksaanAPHModel[]>;
    createAPH(data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel>;
    updateAPH(id: string, data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel>;
    deleteAPH(id: string): Promise<pemeriksaanAPHModel>;
    getById(id: string): Promise<pemeriksaanAPHModel>;
    SubmitAPH(id: string, data: pemeriksaanAPHModel): Promise<pemeriksaanAPHModel>;
}
