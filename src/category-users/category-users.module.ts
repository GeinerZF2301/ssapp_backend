import { Module } from '@nestjs/common';
import { CategoryUserService } from './category-users.service';
import { CategoryUsersController } from './category-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryUser } from './category-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryUser])],
  controllers: [CategoryUsersController],
  providers: [CategoryUserService],
})
export class CategoryUsersModule {}
