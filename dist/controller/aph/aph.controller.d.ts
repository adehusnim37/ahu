import { APHService } from './aph.service';
import { pemeriksaanAPHModel } from "../../model/aph/aph.model";
import { CreateUpdateAphDto } from '../../dto/aph/createAndUpdate.dto';
export declare class APHController {
    private readonly APHService;
    constructor(APHService: APHService);
    getAll(pageIndex: number, pageSize: number, stringPencarian: string, sortBy: string, isSortAscending: boolean, res: any): Promise<any>;
    getById(id: string, res: any): Promise<pemeriksaanAPHModel>;
    create(postdata: CreateUpdateAphDto, res: any): Promise<pemeriksaanAPHModel>;
    submit(id: string, postdata: CreateUpdateAphDto, res: any): Promise<pemeriksaanAPHModel>;
    update(id: string, postdata: CreateUpdateAphDto, res: any): Promise<pemeriksaanAPHModel>;
    delete(id: string, res: any): Promise<pemeriksaanAPHModel>;
}
