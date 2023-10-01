import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {UsersService} from '../users/users.service'
import { validate } from 'class-validator';
@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

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
}
