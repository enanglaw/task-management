import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { TaskRepository } from './tasks/task.repository';
@Module({
  imports: [
    
    TypeOrmModule.forRoot({
        type:'postgres',
        host:'localhost',
        port:5432,
        password:'@A1w2a3s4e5',
        username:'postgres',
        database:'task-management',
        autoLoadEntities:true,
        synchronize:true

    }),
    TasksModule,
    AuthModule],
})
export class AppModule {}
