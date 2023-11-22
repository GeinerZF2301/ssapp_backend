import { Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruitment } from 'src/recruitments/recruitments.entity';


import { Repository } from 'typeorm/repository/Repository';

export class RecruitmentQueries {
  constructor(
    @InjectRepository(Recruitment)
    private readonly recruitmentRepository: Repository<Recruitment>,
  ) {}

  async getRecruitmentByMusicianId(musicianId: number) {
    try {
      const recuitmentsByMusician = await this.recruitmentRepository
        .createQueryBuilder('recruitment')
        .leftJoinAndSelect('recruitment.musicianId', 'musician')
        .leftJoinAndSelect('recruitment.contractorId', 'contractor')
        .where('recruitment.musicianId = :musicianId', { musicianId })
        .select([
          'recruitment.id AS recruitmentId',
          'recruitment.date_hire AS date',
          'recruitment.start_time AS start',
          'recruitment.end_time AS end',
          'recruitment.event_location AS eventLocation',
          'recruitment.type_event AS typeEvent',
          'recruitment.agreed_rate AS amount',
          'recruitment.payment_status AS paymentStatus',
          'recruitment.payment_date AS paymentDate',
          'musician.id AS musicianId',
          'musician.username AS musicianUsername',
          'musician.email AS musicianEmail',
          'contractor.id AS contractorId',
          'contractor.username AS contractorUsername',
          'contractor.email AS contractorEmail',
        ])
        .getRawMany();
  
      if (!recuitmentsByMusician || recuitmentsByMusician.length === 0) {
        throw new HttpException(`No se han encontrado contrataciones para el usuario ${musicianId}`, HttpStatus.NOT_FOUND);
      }
      return recuitmentsByMusician;
    } catch (error) {
      console.error(error);
      throw new HttpException(`Ha ocurrido un error al ejecutar la consulta: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getRecruitmentByContractorId(contractorId: number) {
    try {
      const recuitmentsByContractor = await this.recruitmentRepository
        .createQueryBuilder('recruitment')
        .leftJoinAndSelect('recruitment.musicianId', 'musician')
        .leftJoinAndSelect('recruitment.contractorId', 'contractor')
        .where('recruitment.contractorId = :contractorId', { contractorId })
        .select([
          'recruitment.id AS recruitmentId',
          'recruitment.date_hire AS date',
          'recruitment.start_time AS start',
          'recruitment.end_time AS end',
          'recruitment.event_location AS eventLocation',
          'recruitment.type_event AS typeEvent',
          'recruitment.agreed_rate AS amount',
          'recruitment.payment_status AS paymentStatus',
          'recruitment.payment_date AS paymentDate',
          'musician.id AS musicianId',
          'musician.username AS musicianUsername',
          'musician.email AS musicianEmail',
        ])
        .getRawMany();
  
      if (!recuitmentsByContractor || recuitmentsByContractor.length === 0) {
        throw new HttpException(`No se han encontrado contrataciones para el usuario ${contractorId}`, HttpStatus.NOT_FOUND);
      }
      return recuitmentsByContractor;
    } catch (error) {
      console.error(error);
      throw new HttpException(`Ha ocurrido un error al ejecutar la consulta: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
