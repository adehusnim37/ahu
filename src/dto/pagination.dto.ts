// pagination.dto.ts

import { IsEnum, IsInt, IsOptional, IsString} from 'class-validator';
import {Type} from 'class-transformer';


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
    stringPencarian?: string;

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsEnum(['true', 'false'], {message: 'isSortAscending must be true or false'})
    isSortAscending?: string;
}
