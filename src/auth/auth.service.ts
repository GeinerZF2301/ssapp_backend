import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from '../users/users.service';
import { validate } from 'class-validator';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(registerDto: RegisterAuthDto) {
    try {
      const validationErrors = await validate(registerDto);
      if (validationErrors.length > 0) {
        throw new HttpException(
          validationErrors,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const newUser = await this.userService.createUser(registerDto);
      return newUser;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Ocurrió un error durante el registro',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async signIn(loginDto: LoginAuthDto) {
    try {
      const validationErrors = await validate(loginDto);
      if (validationErrors.length > 0) {
        throw new HttpException(
          validationErrors,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const userCheckConfirm =
      await this.userService.checkUserCredentials(loginDto);
      const { id, username } = userCheckConfirm.userFoundByEmail;
      const payload = { sub: id, username: username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }
}
