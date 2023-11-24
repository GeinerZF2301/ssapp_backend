import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { LoginAuthDto } from '../auth/dto/login-auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

  ) {}

  async createUser(user: RegisterAuthDto) {
    try {
      const userFound = await this.userRepository.findOne({
        where: [
          { email: user.email },
          { username: user.username },
        ],
      });
      if (!userFound) {
        const hashedPassword = await this.hashPassword(user.password);
        const newUser = this.userRepository.create({
          username: user.username,
          email: user.email,
          password: hashedPassword,
        });
        await this.userRepository.save(newUser);
        return { message: 'Usuario creado exitosamente' };
      } else {
        throw new HttpException('El correo o nombre de usuario ya existe', HttpStatus.CONFLICT);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('Ocurrió un error durante el registro', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async hashPassword(password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      console.error('Error al encriptar la contraseña:', error);
      throw new HttpException('Ocurrió un error durante el registro', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  getUsers() {
    return this.userRepository.find();
  }
  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) {
      return new HttpException('Usuario No Encontrado', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }
  async checkUserCredentials(user: LoginAuthDto) {
    const userFoundByEmail = await this.userRepository.findOne({ 
      where: {
        email: user.email
      },
    });
    if (!userFoundByEmail) {
      throw new HttpException("Correo electrónico incorrecto. Por favor, inténtalo de nuevo", HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await this.verifyPassword(user.password, userFoundByEmail.password);
    if (!isPasswordValid) {
      throw new HttpException("Contraseña incorrecta. Por favor, inténtalo de nuevo", HttpStatus.UNAUTHORIZED);
    }
    return { message: "Autenticación exitosa", status: HttpStatus.OK };
  }
  
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
  
  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return 'Usuario eliminado exitosamente';
  }

  updateUser(id: number, user: UpdateUserDto) {
    return this.userRepository.update({ id }, user);
  }
 

 
}
