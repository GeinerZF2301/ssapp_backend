import { Module } from '@nestjs/common';
import { RecruitmentsController } from './recruitments.controller'; 
import { RecruitmentsService } from './recruitments.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from './recruitments.entity';
import { User } from 'src/users/user.entity';
import { RecruitmentQueries } from 'src/queries/recruitments/recruitmentsUsers';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment, User])],
  controllers: [RecruitmentsController],
  providers: [RecruitmentsService, RecruitmentQueries],
})
export class RecruitmentsModule {}
