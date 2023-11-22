import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private userService: UsersService,
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
                message: 'Perfil creado satisfactoriamente',
                status: HttpStatus.CREATED,
            };
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Ha ocurrido un error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    getProfiles() {
        return this.profileRepository.find({
            relations: {
                user: true,
                skills: true,
            },
        });
    }

    async getProfileById(id: number) {
        try {
            const profileFound = await this.profileRepository.findOne({
                where: { id },
                relations: ['user' , 'skills'],
            });
            if (!profileFound) {
                throw new HttpException(
                    'No existe un perfil con este id',
                    HttpStatus.NOT_FOUND,
                );
            }
            const user = await this.userRepository.findOne({
                where: { id: profileFound.user.id },
                select: ['id', 'username', 'email'],
            });
            profileFound.user = user;
            return profileFound;
        } catch (error) {
            console.error('Error al realizar la búsqueda de perfil:', error.message);
            throw error;
        }
    }

    async updateProfile(id: number, profileUpdate: UpdateProfileDto) {
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
        } = profileUpdate;
        const userFound = await this.userService.getUser(userId);
        const profileFound = await this.profileRepository.findOne({
            where: {
                id,
            },
        });
        if (!profileFound) {
            throw new NotFoundException(
                'No ha sido encontrado el registro solicitado',
            );
        }
        if (userFound instanceof HttpException) {
            throw userFound;
        }
        profileFound.name = name;
        profileFound.lastname1 = lastname1;
        profileFound.lastname2 = lastname2;
        profileFound.birthDate = birthDate;
        profileFound.phone_number = phone_number;
        profileFound.state = state;
        profileFound.city = city;
        profileFound.street = street;
        profileFound.address = address;
        profileFound.postalCode = postalCode;
        profileFound.avatar_route = avatarRoute;
        profileFound.avatar_filename = avatarFilename;
        profileFound.occupation = occupation;
        profileFound.interest = interest;
        profileFound.facebook = facebook;
        profileFound.instagram = instagram;
        profileFound.tiktok = tiktok;
        profileFound.user = userFound;

        await this.profileRepository.save(profileFound);
        return {
            message: "Perfil actualizado correctamente",
            status: HttpStatus.OK
        }
      } catch (error) {
        console.log(error);
        throw error;
      }

    }
    async deleteProfile(id: number) {
        const result = await this.profileRepository.delete({ id });
        if (result.affected === 0) {
            throw new HttpException('Skill No Encontrada', HttpStatus.NOT_FOUND);
        }
        return {
            message: "Perfil eliminado correctamente",
            status: HttpStatus.NO_CONTENT
        }
    }

}
