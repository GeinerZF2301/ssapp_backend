import { Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from 'src/aplicants/applicant.entity';

import { Repository } from 'typeorm/repository/Repository';

export class ApplicantQueries {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
  ) {}

  async getApplicantDataByUserId(@Param('id') id: number) {
    try {
      const applicants = await this.applicantRepository
        .createQueryBuilder('applicant')
        .leftJoinAndSelect(
          'applicant.applicantMusician',
          'user',
          'user.id = applicant.applicantMusicianId',
        )
        .leftJoinAndSelect('applicant.post', 'post')
        .where('user.id = :id', { id })
        .select(['user.id', 'user.username', 'user.email', 'applicant' , 'post'])
        .getMany();
  
      if (applicants.length === 0) {
        throw new HttpException("No se han encontrado ofertas a las que haya aplicado el usuario", HttpStatus.NOT_FOUND);
      }
      return applicants;
    } catch (error) {
      console.error('Error al realizar la consulta:', error.message);
      throw error; 
    }
  }
  

  async getApplicantDataByPostId(@Param('postId') postId: number) {
    try {
      const applicants = await this.applicantRepository
        .createQueryBuilder('applicant')
        .leftJoinAndSelect('applicant.post', 'post')
        .leftJoinAndSelect(
          'applicant.applicantMusician',
          'user',
          'user.id = applicant.applicantMusicianId',
        )
        .where('post.id = :postId', { postId })
        .select(['applicant', 'post.id', 'post.title', 'user.id', 'user.username', 'user.email'])
        .getMany();

      if (applicants.length === 0) {
        throw new HttpException("No se han encontrado aplicantes para esta oferta", HttpStatus.NOT_FOUND);
      }
      return applicants;
    } catch (error) {
      console.error('Error al realizar la consulta:', error.message);
      throw error;
    }
  }
}
