import { APHService } from './example.service';
import { pemeriksaanAPHModel } from "../../model/example/user.model";
import { CreateUpdateAphDto } from '../../dto/example/createAndUpdate.dto';
export declare class APHController {
    private readonly APHService;
    constructor(APHService: APHService);
    getAllAPH(pageIndex: number, pageSize: number, stringPencarian: string, sortBy: string, isSortAscending: boolean, res: any): Promise<any>;
    getAPHById(id: string, res: any): Promise<pemeriksaanAPHModel>;
    createAPH(postdata: CreateUpdateAphDto, res: any): Promise<pemeriksaanAPHModel>;
    submitAPH(id: string, postdata: CreateUpdateAphDto, res: any): Promise<pemeriksaanAPHModel>;
    updateAPH(id: string, postdata: CreateUpdateAphDto, res: any): Promise<pemeriksaanAPHModel>;
    deleteAPH(id: string, res: any): Promise<pemeriksaanAPHModel>;
}
