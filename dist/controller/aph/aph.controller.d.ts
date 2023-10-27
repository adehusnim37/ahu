import { APHService } from './aph.service';
import { pemeriksaanAPHModel } from "../../model/aph/aph.model";
import { CreateUpdateAphDto } from '../../dto/aph/createAndUpdate.dto';
import { PaginationDto } from "../../dto/pagination.dto";
export declare class APHController {
    private readonly APHService;
    constructor(APHService: APHService);
    getAll(PaginationDto: PaginationDto, res: any, req: Request): Promise<any>;
    getById(id: string, res: any, req: Request): Promise<pemeriksaanAPHModel>;
    create(postdata: CreateUpdateAphDto, req: Request, res: any): Promise<pemeriksaanAPHModel>;
    submit(id: string, res: any, req: Request): Promise<pemeriksaanAPHModel>;
    update(id: string, postdata: CreateUpdateAphDto, res: any, req: Request): Promise<pemeriksaanAPHModel>;
    delete(id: string, res: any, req: Request): Promise<pemeriksaanAPHModel>;
}
