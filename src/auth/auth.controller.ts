import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth.credential.dto';
import { ApiResponseDTO } from './dto/api.response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private userService:AuthService){

    }
    @Post('/signUp')
    async signUp(@Body() body:AuthCredentialDTO):Promise<void>{
     return this.userService.signUp(body);
    }
    @Post('/signIn')
    async signIn(@Body() body:AuthCredentialDTO):Promise<ApiResponseDTO>{
     return (await this.userService.signIn(body));
    }
    @Post('/test')
    @UseGuards(AuthGuard())
    async test(@Body() body:AuthCredentialDTO):Promise<ApiResponseDTO>{
     return (await this.userService.signIn(body));
    }
}
