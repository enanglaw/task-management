import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[TypeOrmModule.forFeature([Task,TaskRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService,TaskRepository],
  exports:[TasksService,TaskRepository]
})
export class TasksModule {}
