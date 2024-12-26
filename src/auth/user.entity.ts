import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({ length: 100, unique:true})
    userName:string
    @Column({ length: 100})
    password:string
    @Column({ length: 100, nullable: true })
    emailAddress:string


}