import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDTO } from "./dto/auth.credential.dto";
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "./jwt.payload.interface";
import { ApiResponseDTO } from "./dto/api.response.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        private readonly jwtService:JwtService
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
    async signIn(authCredentialDTO:AuthCredentialDTO):Promise<ApiResponseDTO>{
        const {userName,password}=authCredentialDTO
       const user=this.repository.findOne({where:{userName}})
       if(user && (await bcrypt.compare(password, (await user).password))){
        const payload:IJwtPayload={userName};
        const accessToken:string=(await this.jwtService.signAsync(payload));
        const responseHeader:ApiResponseDTO={
            jwt:accessToken,
            responseCode:'000',
            responseMessage:'success'
        }
        return responseHeader
       }else{
        throw new UnauthorizedException('Please check your login Credentials')
       }

    }
    
}