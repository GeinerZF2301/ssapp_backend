import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostHiring } from './post-hiring.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostHiringDto } from './dto/create-post-hiring.dto';
import { UpdatePostHiringDto } from './dto/update-post-hiring.dto';

import { Skill } from 'src/skills/skill.entity';

@Injectable()
export class PostHiringsService {
    constructor(
        @InjectRepository(PostHiring)
        private postHiringRepository: Repository<PostHiring>,
        private userService: UsersService,
    ) { }

    async createPostHiring(postHiring: CreatePostHiringDto) {
        const contractorUser = await this.userService.getUser(
            postHiring.contractorUserId,
        );
        if (contractorUser instanceof HttpException) {
            throw contractorUser;
        } else {
            const newPost = this.postHiringRepository.create({
                title: postHiring.title,
                description: postHiring.description,
                contractorUser: contractorUser,
            });
            await this.postHiringRepository.save(newPost);
            return {
                message: 'Post de contratación creado exitosamente',
                status: HttpStatus.CREATED,
                data: newPost,
            };
        }
    }
    getPostHirings() {
        return this.postHiringRepository.find();
    }

    async getPostHiringById(id: number){
        const postFound = await this.postHiringRepository.findOne({
            where:{
                id, 
            }
        });
        if(!postFound){
            return new HttpException("Publicacion No Encontrada", HttpStatus.NOT_FOUND)
        }
        return postFound;
    }
    async updatePostHiring(id: number, postHiring: UpdatePostHiringDto){
        const contractorUser = await this.userService.getUser(
            postHiring.contractorUserId,
        );
        const postFound = await this.postHiringRepository.findOne({
            where:{
                id,
            },
        });
        if(!postFound){
            throw new NotFoundException("Post no encontrado")
        }else if(!(contractorUser instanceof HttpException)){
            postFound.title = postHiring.title,
            postFound.description = postHiring.description,
            postFound.contractorUser = contractorUser
            await this.postHiringRepository.save(postFound);
        }
        return {
            message: 'Post actualizado',
            status: HttpStatus.OK
        };
    }

    async deletePostHiring(id: number){
        const result = await this.postHiringRepository.delete({id})
        if(result.affected === 0){
            return new NotFoundException("Post no encontrado")
        }
        return {
            message: "Post eliminado correctamente",
            status: HttpStatus.OK
        }
    }

    

    
        

}
