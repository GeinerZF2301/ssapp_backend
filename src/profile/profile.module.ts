import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/users/user.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Profile, User])],
    controllers: [ProfileController],
    providers: [ProfileService, UsersService]
})
export class ProfileModule {}
