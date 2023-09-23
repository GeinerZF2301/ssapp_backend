import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (!userFound) {
      const hashedPassword = await bcrypt.hash(user.password, 10); 
      const newUser = this.userRepository.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);
      return 'Usuario creado exitosamente';
    }
    throw new HttpException('Este correo ya existe', HttpStatus.CONFLICT);
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
