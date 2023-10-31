// pagination.dto.ts

import {IsOptional, IsInt, IsString, IsBoolean, IsBooleanString} from 'class-validator';
import { Type } from 'class-transformer';


export class PaginationDto {

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    pageIndex?: number = 1;


    @IsOptional()
    @IsInt()
    @Type(() => Number)
    pageSize?: number = 10;

    @IsOptional()
    @IsString()
    stringPencarian?: string;

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsBooleanString()
    isSortAscending?: boolean;
}
