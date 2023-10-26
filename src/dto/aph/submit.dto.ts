import {IsEnum, IsNotEmpty, IsOptional} from "class-validator";
import {Status} from "@prisma/client";

export class SubmitAphDto {
    @IsNotEmpty()
    isSubmit: boolean;

    @IsNotEmpty()
    recUpdate: Date;

    @IsNotEmpty()
    dateSubmit: Date;

    @IsOptional()
    @IsEnum(Status)
    status?: Status;
}
