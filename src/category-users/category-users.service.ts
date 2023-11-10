import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryUser } from './category-user.entity';
import { CreateCategoryUserDto } from './dto/create-category-user.dto'; 
import { UpdateCategoryUserDto } from './dto/update-category-user.dto'; 

@Injectable()
export class CategoryUserService {
  constructor(
    @InjectRepository(CategoryUser)
    private CategoryUserRepository: Repository<CategoryUser>,
  ) {}

  async createCategoryUser(categoryUser: CreateCategoryUserDto) {
    const newCategoryUser = this.CategoryUserRepository.create(categoryUser);
    await this.CategoryUserRepository.save(newCategoryUser);
    return 'Categoría de negocio creada exitosamente';
  }

  async getCategoryUsers() {
    return await this.CategoryUserRepository.find();
  }

  async getCategoryUser(id: number) {
    const categoryUserFound = await this.CategoryUserRepository.findOne({
      where: {
          id,
      },
    });
    if (!categoryUserFound) {
      throw new HttpException('Categoría de negocio no encontrada', HttpStatus.NOT_FOUND);
    }
    return categoryUserFound;
  }

  async deleteCategoryUser(id: number) {
    const result = await this.CategoryUserRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Categoría de negocio no encontrada', HttpStatus.NOT_FOUND);
    }
    return {message:'Categoría de negocio eliminada correctamente', status: HttpStatus.OK};
  }

  async updateCategoryUser(id: number, CategoryUser: UpdateCategoryUserDto) {
    await this.getCategoryUser(id); 
    await this.CategoryUserRepository.update(id, CategoryUser);
    return 'Categoría de negocio actualizada correctamente';
  }
}
