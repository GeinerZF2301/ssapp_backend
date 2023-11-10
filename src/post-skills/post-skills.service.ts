import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostHiring } from 'src/post-hirings/post-hiring.entity';
import { Skill } from 'src/skills/skill.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PostSkillsService {
    constructor(
        @InjectRepository(PostHiring)
        private readonly postHiringRepository: Repository<PostHiring>,
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
    ) { }

    // async addSkillsToPostHiring() { 
    //     try { 
    //         const postHiring = await this.postHiringRepository 
    //             .createQueryBuilder('postHiring') 
    //             .leftJoinAndSelect('postHiring.skills', 'skills') 
    //             .where('postHiring.id = :id', { id: postHiringId }) 
    //             .getOne(); 
    //         const skillToAdd = await this.skillRepository.findOne({
    //             where:{
    //                 skillId,
    //             }
    //         }); 
    //         if (!postHiring || !skillToAdd) {
    //             throw new NotFoundException('Post hiring or skill not found');
    //           }
    //         await this.postHiringRepository.save(postHiring); 
    //         return { 
    //             message: "Skill Asociadas a la publicacion de manera satisfactoria", 
    //             status: HttpStatus.CREATED 
    //         } 
    //     } catch (error) { 
    //         console.error(error); 
    //         throw new HttpException("Ha ocurrido un error al asociar las skills al post", HttpStatus.INTERNAL_SERVER_ERROR) 
    //     } 
    // } 
}