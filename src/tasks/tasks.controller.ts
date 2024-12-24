import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { query } from 'express';
import { SearchFilterDTO } from './dto/search-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDTO:SearchFilterDTO): Task[] {
    
   if(Object.keys(filterDTO).length)
    {
   return this.taskService.getTasksByFilter(filterDTO)
   }else{
    return this.taskService.getAllTasks();
   }
  }
  @Get('/:id')
  getTaskById(@Param('id') id:string): Task {
    return this.taskService.getTaskById(id);
  }
 
  @Post()
  createTask(@Body() body: CreateTaskDTO): Task {
    return this.taskService.createTask(body);
  }

  @Put('/:id')
  editItem(@Param('id') id:string){

  }
  @Patch('/:id/status')
  editTask(@Param('/id')id:string,
  @Body('status') status:TaskStatus) {
   
    return this.taskService.updateStatus(id,status)
  }
  
  @Delete('/:id')
  deleteTask(@Param('id') id:string) {
    return this.taskService.deleteTask(id);
  }
}
