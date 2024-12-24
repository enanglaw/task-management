import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { title } from 'process';
import {v4 as uuid} from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchFilterDTO } from './dto/search-filter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[]=[]
    getAllTasks():Task[]{
        return this.tasks
    }
  createTask(task:CreateTaskDTO):Task{
    const {title,description}=task
  const createTask:Task={
    id:uuid(),
    title:task.title,
    description:task.description,
    // createdDate:task.createdDate,
    // startDate:task.startDate,
    // endDate:task.endDate,
    status:TaskStatus.OPEN

  }
this.tasks.push(createTask);
return createTask;
  }
  getTaskById(id:string):Task{
 return this.tasks.find((item)=>item.id===id)

  }
  getTasksByFilter(filterDTO:SearchFilterDTO):Task[]{
    const{status, search}=filterDTO;
    let tasks=this.getAllTasks();
    if(status){
        tasks=tasks.filter((item)=>item.status===status)
    }
    if(search){
        tasks=tasks.filter((item)=>{
           if(item.description.toLowerCase().trim().includes(search)|| item.title.toLowerCase().trim().includes(search)||item.status.includes(search)){
            return true;
           }
           return false;
        })
    }
   return tasks;
  }
  deleteTask(id:string):void{
this.tasks=this.tasks.filter((item)=>item.id!==id);
    
  }
  updateStatus(id:string, taskStatus:TaskStatus){
    const taskToUpdate:Task=this.getTaskById(id);
    taskToUpdate.status=taskStatus;
    return taskToUpdate;

  }
}
