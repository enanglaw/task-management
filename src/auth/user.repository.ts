import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDTO } from "./dto/auth.credential.dto";
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
      ) {}
  

    async createUser(authCredentialDTO:AuthCredentialDTO):Promise<void>{
       
        const {userName,password}=authCredentialDTO
        const salt= await bcrypt.genSalt()
        const hashPassword=await bcrypt.hash(password,salt)
        const newUser=this.repository.create({
            userName,password:hashPassword
        });
        try{
            await this.repository.save(newUser);
        }
       catch(error){
        if(error.code=='23505'){
           
          throw new ConflictException(`The user ${userName} already exists!`)
        }
        else{
            throw new InternalServerErrorException()
        }
       }
      

    }
    async signIn(authCredentialDTO:AuthCredentialDTO):Promise<string>{
        const {userName,password}=authCredentialDTO
       const user=this.repository.findOne({where:{userName}})
       if(user && (await bcrypt.compare(password, (await user).password))){
        return 'success'
       }else{
        throw new UnauthorizedException('Please check your login Credentials')
       }

    }
    
}