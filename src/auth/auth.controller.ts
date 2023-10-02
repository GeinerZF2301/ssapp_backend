import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService ){}
    @Post('register')
    signUp(@Body() registerDto : RegisterAuthDto){
        return this.authService.signUp(registerDto);
    }
    @Post('login')
    signIn(@Body() loginDto: LoginAuthDto){
        return this.authService.signIn(loginDto);
    }
}
