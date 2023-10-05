import { Module } from '@nestjs/common';
import { RecruitmentsController } from './recruitments.controller'; 
import { RecruitmentsService } from './recruitments.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from './recruitments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment])],
  controllers: [RecruitmentsController],
  providers: [RecruitmentsService],
})
export class RecruitmentsModule {}
