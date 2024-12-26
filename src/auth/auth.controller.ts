import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth.credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private userService:AuthService){

    }
    @Post('/signUp')
    async signUp(@Body() body:AuthCredentialDTO):Promise<void>{
     return this.userService.signUp(body);
    }
    @Post('/signIn')
    async signIn(@Body() body:AuthCredentialDTO):Promise<string>{
     return (await this.userService.signIn(body));
    }
}
