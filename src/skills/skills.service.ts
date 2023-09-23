import {
    HttpException,
    Injectable,
    HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
@Injectable()
export class SkillsService {
    constructor(
        @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    ) { }

    async createSkill(skill: CreateSkillDto) {
        const skillFound = await this.skillRepository.findOne({
            where: {
                name: skill.name,
            },
        });
        if (!skillFound) {
            const newSkill = this.skillRepository.create({
                name: skill.name,
            });
            await this.skillRepository.save(newSkill);
            return 'Skill creada exitosamente';
        }
        throw new HttpException('Esta skill ya existe', HttpStatus.CONFLICT);
    }
    getSkills() {
        return this.skillRepository.find();
    }
    async getSkill(id: number) {
        const skillFound = await this.skillRepository.findOne({
            where: {
                id,
            },
        });
        if (!skillFound) {
            return new HttpException('Skill No Encontrada', HttpStatus.NOT_FOUND);
        }
        return skillFound;
    }

    async deleteSkill(id: number) {
        const result = await this.skillRepository.delete({ id });
        if (result.affected === 0) {
            return new HttpException('Skill No Encontrada', HttpStatus.NOT_FOUND);
        }
        return new HttpException('Skill eliminada correctamente', HttpStatus.OK);
    }

    updateSkill(id: number, skill: UpdateSkillDto) {
        return this.skillRepository.update({ id }, skill);
    }
}
