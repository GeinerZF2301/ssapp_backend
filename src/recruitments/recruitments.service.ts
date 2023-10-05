import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './recruitments.entity';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto'; 
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto'; 

@Injectable()
export class RecruitmentsService {
  constructor(
    @InjectRepository(Recruitment) private recruitmentRepository: Repository<Recruitment>,
  ) {}

  async createRecruitment(recruitment: CreateRecruitmentDto) {
    const newRecruitment = this.recruitmentRepository.create(recruitment);
    await this.recruitmentRepository.save(newRecruitment);
    return 'Recruitment creado exitosamente';
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
        
        throw new HttpException('Recruitment No Encontrado', HttpStatus.NOT_FOUND);
    }

    return recruitmentFound;
}

  async deleteRecruitment(id: number) {
    const result = await this.recruitmentRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Recruitment No Encontrado', HttpStatus.NOT_FOUND);
    }
    return 'Recruitment eliminado correctamente';
  }

  async updateRecruitment(id: number, recruitment: UpdateRecruitmentDto) {
    await this.getRecruitment(id); 
    await this.recruitmentRepository.update(id, recruitment);
    return 'Recruitment actualizado correctamente';
  }
}
