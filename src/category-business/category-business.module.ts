import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryBusiness } from './category-business.entity';
import { CategoryBusinessController } from './category-business.controller';
import { CategoryBusinessService } from './category-business.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryBusiness])],
  controllers: [CategoryBusinessController],
  providers: [CategoryBusinessService],
})
export class CategoryBusinessModule {}
