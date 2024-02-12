import { HttpException, HttpStatus, Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostHiring } from './post-hiring.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostHiringDto } from './dto/create-post-hiring.dto';
import { UpdatePostHiringDto } from './dto/update-post-hiring.dto';



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
                date: postHiring.date,
                type_event: postHiring.type_event,
                monto: postHiring.monto,
                user: contractorUser,
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
        return this.postHiringRepository.find({
            relations:{
                skills: true,
                user: true
            },
        });
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
        try {
            const {title, description, contractorUserId} = postHiring;
            const contractorUser = await this.userService.getUser(
                contractorUserId,
            );
            const postFound = await this.postHiringRepository.findOne({
                where:{
                    id,
                },
            });
            if(!postFound){
                throw new NotFoundException("Post no encontrado")
            }
            if(contractorUser instanceof HttpException){
                throw contractorUser;
            }
            postFound.title = postHiring.title,
            postFound.description = postHiring.description,
            postFound.date = postHiring.date,
            postFound.type_event = postHiring.type_event,
            postFound.monto = postHiring.monto,
            postFound.user = contractorUser
            await this.postHiringRepository.save(postFound);
            return {
                message: 'Post actualizado',
                status: HttpStatus.OK
            };
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Ha ocurrido un error al actualizar el post',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
       
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
