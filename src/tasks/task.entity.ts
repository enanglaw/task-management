import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Task{
       @PrimaryGeneratedColumn('uuid')
       id:string
       @Column()
        title:string
        @Column()
        description:string
       
        createdDate:Date
        @Column()
        status:TaskStatus
        @ManyToOne(_type=>User,user=>user.tasks,{eager:false})
        user:User
}