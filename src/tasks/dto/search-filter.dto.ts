import { IsEnum, isEnum, IsOptional, IsString, isString } from "class-validator";
import { TaskStatus } from "../task.model";

export class SearchFilterDTO{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus;
    @IsOptional()
    @IsString()
    search?:string;
}