import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService ){}
    @Post('register')
    signUp(@Body() registerDto : RegisterAuthDto){
        return this.authService.signUp(registerDto);
    }
    @Post('login')
    signIn(){
        return 'login';
    }
}
