import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './task.status.enum';
import { title } from 'process';
import {v4 as uuid} from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto';
import { SearchFilterDTO } from './dto/search-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository:TaskRepository){

  }
 async getTaskById(id:string):Promise<Task>{
  const found= await this.taskRepository.findOne({where:{id}})
  if(!found){
    throw new NotFoundException(`Task with ID ${id} not found`);
  }
    else{
      return found;
    }
  }
  async getTasks():Promise<Task[]>{
    const tasks = await this.taskRepository.find(); 
    if(tasks){
      throw new NotFoundException('No tasks found'); 
    }else
    return tasks;

  }
  async createTask(createTaskDTO:CreateTaskDTO):Promise<Task>{
    const {title,description}=createTaskDTO
    const newTask = this.taskRepository.create({
      title,
      description,
      startDate: new Date(),
      endDate: null,       
      createdDate: new Date(),
      status: TaskStatus.OPEN, 
    });
  
    await this.taskRepository.save(newTask); 
    return newTask;
  }
  async filterTasks(filterDTO: SearchFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;
    let tasks = await this.getTasks(); 
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    if (search) {
      tasks = tasks.filter((task) => {
        const searchTerm = search.toLowerCase().trim();
        return (
          task.description.toLowerCase().includes(searchTerm) ||
          task.title.toLowerCase().includes(searchTerm) ||
          task.status.toLowerCase().includes(searchTerm)
        );
      });
    }
  
    return tasks;
  }
 
  }
  async updateStatus(id:string, status:TaskStatus):Promise<Task>{
  const task = await this.getTaskById(id); 
  task.status = status;
  await this.taskRepository.save(task);
  return task;

  }
  async deleteTask(id:string):Promise<void>{
    const found= await this.getTaskById(id)
    if(!found){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
      else{
        
         await this.taskRepository.delete(id)

      }
    }
}

