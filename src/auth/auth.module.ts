import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import {JwtModule} from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'enangTopSecrete',
      signOptions:{
        expiresIn:'1h'
      }
    }),
    TypeOrmModule.forFeature([User,UserRepository])],
  providers: [AuthService,UserRepository],
  controllers: [AuthController],
  exports:[AuthService,UserRepository]
})
export class AuthModule {}