import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IJwtPayload } from "./jwt.payload.interface";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
      
         @InjectRepository(User)
                private readonly repository: Repository<User>,
    ){
        super({
            secretOrKey:'enangTopSecrete',
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()

        });
    }

 async validate(payload:IJwtPayload):Promise<User>{
    const {userName}=payload;
    const user=await this.repository.findOne({where:{userName}})
    if(!user){
        throw new UnauthorizedException();
    }
  return user;
 }

}