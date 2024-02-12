import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from '../users/user.entity';
import {UsersService} from '../users/users.service'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/helpers/authConstants';

@Module({
  controllers: [AuthController], 
  providers: [AuthService, UsersService], 
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secretKey,
    signOptions: { expiresIn: '1h' },
  }),
], 
})
export class AuthModule {}
