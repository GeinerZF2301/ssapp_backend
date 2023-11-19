import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostHiring } from 'src/post-hirings/post-hiring.entity';
import { Skill } from 'src/skills/skill.entity';
import { Repository } from 'typeorm';
import { addSkillsToPostDto } from './dto/addSkillsToPost.dto';
import { removeSkillsToPostDto } from './dto/removeSkillsToPost.dto';

@Injectable()
export class PostSkillsService {
  constructor(
    @InjectRepository(PostHiring)
    private readonly postHiringRepository: Repository<PostHiring>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async addSkillsToPostHiring(addSkillsToPost: addSkillsToPostDto) {
    try {
      const { skillsIds, postHiringId } = addSkillsToPost;

      const postHiring = await this.postHiringRepository.findOne({
        where: {
          id: postHiringId,
        },
        relations: {
          skills: true,
        },
      });
      if (!postHiring) {
        throw new HttpException('Post no encontrado', HttpStatus.NOT_FOUND);
      }
      const skills = await this.skillRepository.findByIds(skillsIds);

      postHiring.skills = [...postHiring.skills, ...skills];

      await this.postHiringRepository.save(postHiring);
      return {
        message: 'Skills asociadas al post de manera satisfactoria',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Ha ocurrido un error al asociar las skills al post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteSkillsToPost(skillsToRemove: removeSkillsToPostDto) {
    try {
      const { skillsIds, postHiringId } = skillsToRemove;

      const postHiringFound = await this.postHiringRepository.findOne({
        where: { id: postHiringId },
        relations: ['skills'],
      });

      if (!postHiringFound) {
        throw new HttpException('Post no encontrado', HttpStatus.NOT_FOUND);
      }
      postHiringFound.skills = postHiringFound.skills.filter(
        (skill) => !skillsIds.includes(skill.id),
      );
      await this.postHiringRepository.save(postHiringFound);
      return {
        message: 'Skills eliminadas del post satisfactoriamente',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Ha ocurrido un error al eliminar las skills del post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
