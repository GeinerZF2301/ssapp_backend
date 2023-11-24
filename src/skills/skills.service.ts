import {
    HttpException,
    Injectable,
    HttpStatus,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto.js';
import { UpdateSkillDto } from './dto/update-skill.dto.js';
import { CategorySkillService } from 'src/category-skills/category-skills.service';

@Injectable()
export class SkillsService {
    constructor(
        @InjectRepository(Skill) private skillRepository: Repository<Skill>,
        private categorySkillService: CategorySkillService,
    ) { }

    async createSkill(skill: CreateSkillDto) {
        const category = await this.categorySkillService.getCategory(
            skill.categoryId,
        );
        const skillFound = await this.skillRepository.findOne({
            where: {
                skill: skill.skill,
            },
        });
        if (!skillFound && category) {
            const newSkill = this.skillRepository.create({
                skill: skill.skill,
                category: category,
            });
            await this.skillRepository.save(newSkill);
            return 'Skill creada exitosamente';
        }
        throw new HttpException('Esta skill ya existe', HttpStatus.CONFLICT);
    }
    getSkills() {
        return this.skillRepository.find({
            relations:{
                category: true
            }
        });
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

    async updateSkill(id: number, skill: UpdateSkillDto) {
        const category = await this.categorySkillService.getCategory(
            skill.categoryId,
        );
        const skillFound = await this.skillRepository.findOne({
            where: {
                id,
            },
        });
        if (!skillFound && !category) {
            throw new NotFoundException('Habilidad no encontrada');
        }
        skillFound.skill = skill.skill;
        skillFound.category = category;
        await this.skillRepository.save(skillFound);
        return {
            message: 'Habilidad Actualizada Exitosamente',
            status: HttpStatus.OK,
        };
    }
}
