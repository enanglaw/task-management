import { TaskStatus } from "../task.model";

export class SearchFilterDTO{
    status?:TaskStatus;
    search?:string;
}