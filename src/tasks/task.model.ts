
export interface Task{
    id:string,
    title:string,
    description:string,
    // startDate:Date,
    // endDate:Date,
    // createdDate:Date,
    status:TaskStatus
}
export enum TaskStatus{
    OPEN='OPEN',
    IN_PROGRESS='IN_PROGRESS',
    DONE='DONE'
}