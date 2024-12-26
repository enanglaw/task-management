import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.status.enum";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { SearchFilterDTO } from "./dto/search-filter.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TaskRepository{
     constructor(
            @InjectRepository(Task)
            private readonly repository: Repository<Task>,
          ) {}

     async createTask(createTaskDTO:CreateTaskDTO):Promise<Task>{
        const {title,description}=createTaskDTO
        const newTask = this.repository.create({
          title,
          description,
          status: TaskStatus.OPEN, 
        });
      
       await this.repository.save(newTask); 
        return newTask;
      }
        async getTasks():Promise<Task[]>{
            const tasks = await this.repository.find(); 
            if(tasks){
            throw new NotFoundException('No tasks found'); 
            }else
            return tasks;

        }
        async getTaskById(id:string):Promise<Task>{
            const found= await this.repository.findOne({where:{id}})
            if(!found){
              throw new NotFoundException(`Task with ID ${id} not found`);
            }
              else{
                return found;
              }
            }
            async updateStatus(id:string, status:TaskStatus):Promise<Task>{
                const task = await this.getTaskById(id); 
                task.status = status;
                await this.repository.save(task);
                return task;
              
                }

                async deleteTask(id:string):Promise<void>{
                    const found= await this.getTaskById(id)
                    if(!found){
                      throw new NotFoundException(`Task with ID ${id} not found`);
                    }
                      else{
                        
                         await this.repository.delete(id)
                
                      }
                    }
        async filterTasks(filterDTO: SearchFilterDTO): Promise<Task[]> {
          const { status, search } = filterDTO;
          const query=this.repository.createQueryBuilder('task')
         
          if (status) {
            //tasks = tasks.filter((task) => task.status === status);
            query.andWhere('task.status =:status',{status})
          if (search) {
            query.andWhere('LOWER(task.title) LIKE LOWER( :search) OR LOWER(task.description) LIKE LOWER(:search)',{search:`%{search}%`})
            
          }
         let tasks = query.getMany(); 
          return tasks;
        }
       
        }

}