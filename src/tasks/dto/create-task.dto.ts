
import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator"
export class CreateTaskDTO{
    @IsNotEmpty()
    title:string
    @IsNotEmpty()
    description:string

}