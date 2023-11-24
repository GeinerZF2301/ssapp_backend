import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './applicant.entity';
import { PostHiring } from 'src/post-hirings/post-hiring.entity';
import { User } from 'src/users/user.entity';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';
import { PostHiringsService } from 'src/post-hirings/post-hiring.service';
import { UsersService } from 'src/users/users.service';
import { ApplicantQueries } from 'src/queries/applicants/applicant.queries';

@Module({
    imports: [TypeOrmModule.forFeature([Applicant, PostHiring, User])],
    controllers: [ApplicantController],
    providers: [ApplicantService, PostHiringsService, UsersService, ApplicantQueries]
})
export class AplicantsModule {}
