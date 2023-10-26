import { Status } from "@prisma/client";
export declare class SubmitAphDto {
    isSubmit: boolean;
    recUpdate: Date;
    dateSubmit: Date;
    status?: Status;
}
