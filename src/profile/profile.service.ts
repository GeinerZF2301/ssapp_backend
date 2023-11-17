import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./profile.entity";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { CreateProfileDto } from "./dto/create-profile.dto";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        private userService: UsersService
    ) { }

    async createProfile(newProfile: CreateProfileDto) {
        try {
            const {
                name,
                lastname1,
                lastname2,
                birthDate,
                phone_number,
                state,
                city,
                street,
                address,
                postalCode,
                avatarRoute,
                avatarFilename,
                occupation,
                interest,
                facebook,
                instagram,
                tiktok,
                userId,
            } = newProfile;
    
            const user = await this.userService.getUser(userId);
            if (user instanceof HttpException) {
                throw user;
            }
    
            const newProfileUser = this.profileRepository.create({
                name,
                lastname1,
                lastname2,
                birthDate,
                phone_number,
                state,
                city,
                street,
                address,
                postalCode,
                avatar_route: avatarRoute,
                avatar_filename: avatarFilename,
                occupation,
                interest,
                facebook,
                instagram,
                tiktok,
                user,
            });
            await this.profileRepository.save(newProfileUser);
            return {
                message: "Perfil creado satisfactoriamente",
                status: HttpStatus.CREATED,
            };
        } catch (error) {
            console.log(error);
            throw new HttpException("Ha ocurrido un error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getProfiles(){
        return this.profileRepository.find({
            relations: {
                user: true,
            },
        });
    }
    


}