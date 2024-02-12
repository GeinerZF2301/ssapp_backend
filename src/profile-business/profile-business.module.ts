import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileBusiness } from './profile-business.entity';
import { ProfileBusinessController } from './profile-business.controller';
import { ProfileBusinessService } from './profile-business.service';
import { CategoryBusiness } from 'src/category-business/category-business.entity';
import { User } from 'src/users/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ProfileBusiness, CategoryBusiness,User])],
  controllers: [ProfileBusinessController],
  providers: [ProfileBusinessService],
})
export class ProfileBusinessModule {}