import { APHService } from './aph.service';
import { pemeriksaanAPHModel } from "../../model/aph/aph.model";
import { CreateAphDto } from '../../dto/aph/Create.dto';
import { PaginationDto } from "../../dto/pagination.dto";
import { UpdatePemeriksaanAPHDto } from "../../dto/aph/update.dto";
export declare class APHController {
    private readonly APHService;
    constructor(APHService: APHService);
    getAll(PaginationDto: PaginationDto, res: any, req: Request): Promise<any>;
    getById(id: string, res: any, req: Request): Promise<pemeriksaanAPHModel>;
    create(postdata: CreateAphDto, req: Request, res: any): Promise<pemeriksaanAPHModel>;
    submit(id: string, res: any, req: Request): Promise<pemeriksaanAPHModel>;
    update(id: string, postdata: UpdatePemeriksaanAPHDto, res: any, req: Request): Promise<pemeriksaanAPHModel>;
    delete(id: string, res: any, req: Request): Promise<pemeriksaanAPHModel>;
}
