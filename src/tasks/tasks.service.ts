import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './task.status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchFilterDTO } from './dto/search-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor(
 
    private taskRepository:TaskRepository){

  }
 async getTaskById(id:string):Promise<Task>{
  return await this.getTaskById(id);
  }
  async getTasks():Promise<Task[]>{
  return await this.taskRepository.getTasks()

  }
   createTask(createTaskDTO:CreateTaskDTO):Promise<Task>{
    const newTask = this.taskRepository.createTask(createTaskDTO);
    return newTask;
  }
  async filterTasks(filterDTO: SearchFilterDTO): Promise<Task[]> {
  
   return await this.taskRepository.filterTasks(filterDTO);
  
 
  }
  async updateStatus(id:string, status:TaskStatus):Promise<Task>{
 return this.taskRepository.updateStatus(id,status)

  }
  async deleteTask(id:string):Promise<void>{
   return await this.taskRepository.deleteTask(id)
    }
}

