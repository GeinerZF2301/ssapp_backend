import { Get, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Applicant } from "src/aplicants/applicant.entity";

import { Repository } from "typeorm/repository/Repository";

export class ApplicantQueries {
    constructor(
        @InjectRepository(Applicant)
        private readonly applicantRepository: Repository<Applicant>,
    ) { }

    async getApplicantData(@Param('id') id: number) {
        const applicants = await this.applicantRepository
          .createQueryBuilder('applicant')
          .leftJoinAndSelect('applicant.post', 'post')
          .leftJoinAndSelect('applicant.applicantMusician', 'user', 'user.id = applicant.applicantMusicianId')
          .where('user.id = :id', { id })
          .select(['applicant', 'post', 'user.id', 'user.username', 'user.email'])
          .getMany();
      
        return applicants;
    }
      


}
