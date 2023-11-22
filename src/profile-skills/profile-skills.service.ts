import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { Skill } from 'src/skills/skill.entity';
import { Repository } from 'typeorm';
import { addSkillsToProfileDto } from './dto/addSkillsToProfile.dto';
import { removeSkillsToProfileDto } from './dto/removeSkillsToProfile.dto';

@Injectable()
export class ProfileSkillsService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async addSkillsToProfile(addSkillsToProfile: addSkillsToProfileDto) {
    try {
      const { skillsIds, profileId } = addSkillsToProfile;

      const profileFound = await this.profileRepository.findOne({
        where: {
          id: profileId,
        },
        relations: {
          skills: true,
        },
      });
      if (!profileFound) {
        throw new HttpException('Perfil no encontrado', HttpStatus.NOT_FOUND);
      }
      const skills = await this.skillRepository.findByIds(skillsIds);

      profileFound.skills = [...profileFound.skills, ...skills];

      await this.profileRepository.save(profileFound);
      return {
        message: 'Skills asociadas al perfil de manera satisfactoria',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Ha ocurrido un error al asociar las skills al perfil',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteSkillsToProfile(skillsToRemove: removeSkillsToProfileDto) {
    try {
      const { skillsIds, profileId } = skillsToRemove;
      const profileFound = await this.profileRepository.findOne({
        where: { id: profileId },
        relations: ['skills'],
      });

      if (!profileFound) {
        throw new HttpException('Perfil no encontrado', HttpStatus.NOT_FOUND);
      }
      profileFound.skills = profileFound.skills.filter(
        (skill) => !skillsIds.includes(skill.id),
      );
      await this.profileRepository.save(profileFound);
      return {
        message: 'Skills eliminadas del perfil satisfactoriamente',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Ha ocurrido un error al eliminar las skills del perfil',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
