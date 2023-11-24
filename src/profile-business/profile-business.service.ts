import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileBusiness } from './profile-business.entity';
import { CreateProfileBusinessDto } from './dto/create-profile-business.dto';
import { UpdateProfileBusinessDto } from './dto/update-profile-business.dto';
import { CategoryBusiness } from 'src/category-business/category-business.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProfileBusinessService {
  constructor(
    @InjectRepository(ProfileBusiness)
    private profileBusinessRepository: Repository<ProfileBusiness>,
    @InjectRepository(CategoryBusiness)
    private categoryBusinessRepository: Repository<CategoryBusiness>,
   // @InjectRepository(User)
   // private users: Repository<User>,
  ) {}

  async createProfileBusiness(profileBusinessDto: CreateProfileBusinessDto) {
    
    const selectedDays = profileBusinessDto.days_of_the_week.join(',');
    
    
    const newProfileBusiness = new ProfileBusiness();
    newProfileBusiness.owner_name = profileBusinessDto.owner_name;
    newProfileBusiness.owner_lastname1 = profileBusinessDto.owner_lastname1;
    newProfileBusiness.owner_lastname2 = profileBusinessDto.owner_lastname2;
    newProfileBusiness.business_name = profileBusinessDto.business_name;
    newProfileBusiness.phone_number = profileBusinessDto.phone_number;
    newProfileBusiness.state = profileBusinessDto.state;
    newProfileBusiness.city = profileBusinessDto.city;
    newProfileBusiness.street = profileBusinessDto.street;
    newProfileBusiness.address = profileBusinessDto.address;
    newProfileBusiness.days_of_the_week = selectedDays; 
    newProfileBusiness.openingTime = profileBusinessDto.openingTime;
    newProfileBusiness.closingTime = profileBusinessDto.closingTime;
    newProfileBusiness.avatar_route = profileBusinessDto.avatar_route;
    newProfileBusiness.avatar_filename = profileBusinessDto.avatar_filename;
    newProfileBusiness.about = profileBusinessDto.about;
    newProfileBusiness.facebook = profileBusinessDto.facebook;
    newProfileBusiness.instagram = profileBusinessDto.instagram;
    newProfileBusiness.category = await this.categoryBusinessRepository.findOne({
      where: {
        id: profileBusinessDto.categoryId,
    }
  });
   
    await this.profileBusinessRepository.save(newProfileBusiness);
    
    return 'Perfil de negocio creado exitosamente';
  }
  
  async getProfileBusinesses() {
    return this.profileBusinessRepository.find({ relations: ['category','user'] });
  }
  

  async getProfileBusiness(id: number) {
    const profileBusinessFound = await this.profileBusinessRepository.findOne({
      where: {
        id,
      },
      relations: ['category','user'], // Carga la relación con la categoría
    });
  
    if (!profileBusinessFound) {
      throw new HttpException('Perfil de negocio no encontrado', HttpStatus.NOT_FOUND);
    }
  
    return profileBusinessFound;
  }
  

  async deleteProfileBusiness(id: number) {
    const result = await this.profileBusinessRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Perfil de negocio no encontrado', HttpStatus.NOT_FOUND);
    }
    return 'Perfil de negocio eliminado correctamente';
  }

  async updateProfileBusiness(id: number, profileBusiness: UpdateProfileBusinessDto) {
    await this.getProfileBusiness(id);
    await this.profileBusinessRepository.update(id, profileBusiness);
    return 'Perfil de negocio actualizado correctamente';
  }
}
