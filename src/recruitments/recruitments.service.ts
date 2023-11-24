import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './recruitments.entity';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class RecruitmentsService {
  constructor(
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createRecruitment(recruitment: CreateRecruitmentDto) {
    try {
      const {
        date_hire,
        start_time,
        end_time,
        event_location,
        type_event,
        agreed_rate,
        payment_status,
        payment_date,
        musicianId,
        contractorId,
      } = recruitment;
    
      const musicianFound = await this.userRepository.findOne({
        where:{
          id: musicianId
        }
      });
      const contractorFound = await this.userRepository.findOne({
        where:{
          id: contractorId
        }
      });  
      const newRecruitment = this.recruitmentRepository.create({
        date_hire,
        start_time,
        end_time,
        event_location,
        type_event,
        agreed_rate,
        payment_status,
        payment_date,
        musicianId: musicianFound,
        contractorId: contractorFound,
      });
    
      await this.recruitmentRepository.save(newRecruitment);
      return {
        message: "Contratacion u oferta creado exitosamente",
        status: HttpStatus.CREATED
      };
    } catch (error) {
      console.error(error.message);
    }
  }

  async getRecruitments() {
    return this.recruitmentRepository.find();
  }

  async getRecruitment(id: number) {
    const recruitmentFound = await this.recruitmentRepository.findOne({
      where: {
        id,
      },
    });
    if (!recruitmentFound) {
      throw new HttpException(
        'Recruitment No Encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return recruitmentFound;
  }

  async deleteRecruitment(id: number) {
    const result = await this.recruitmentRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(
        'Recruitment No Encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return 'Recruitment eliminado correctamente';
  }

  async updateRecruitment(id: number, recruitment: UpdateRecruitmentDto) {
    await this.getRecruitment(id);
    await this.recruitmentRepository.update(id, recruitment);
    return 'Recruitment actualizado correctamente';
  }
}
