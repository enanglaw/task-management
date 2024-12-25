import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';
// import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { query } from 'express';
import { SearchFilterDTO } from './dto/search-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(@Query() filterDTO:SearchFilterDTO):Promise< Task[]> {
    
   if(Object.keys(filterDTO).length)
    {
   return (await this.taskService.filterTasks(filterDTO))
   }else{
    return await this.taskService.getTasks();
   }
  }
  @Get('/:id')
 async getTaskById(@Param('id') id:string): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }
 
  @Post()
  async createTask(@Body() body: CreateTaskDTO): Promise<Task> {
    return (await this.taskService.createTask(body));
  }

  @Patch('/:id/status')
 async editTask(@Param('/id')id:string,
  @Body('status') status:TaskStatus):Promise<Task> {
   
    return (await this.taskService.updateStatus(id,status))
  }
  
  @Delete('/:id')
 async deleteTask(@Param('id') id:string) {
    return (await this.taskService.deleteTask(id));
  }
}
