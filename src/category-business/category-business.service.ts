import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryBusiness } from './category-business.entity';
import { CreateCategoryBusinessDto } from './dto/create-category-business.dto'; 
import { UpdateCategoryBusinessDto } from './dto/update-category-business.dto'; 

@Injectable()
export class CategoryBusinessService {
  constructor(
    @InjectRepository(CategoryBusiness)
    private categoryBusinessRepository: Repository<CategoryBusiness>,
  ) {}

  async createCategoryBusiness(categoryBusiness: CreateCategoryBusinessDto) {
    const newCategoryBusiness = this.categoryBusinessRepository.create(categoryBusiness);
    await this.categoryBusinessRepository.save(newCategoryBusiness);
    return 'Categoría de negocio creada exitosamente';
  }

  async getCategoryBusinesses() {
    return this.categoryBusinessRepository.find();
  }

  async getCategoryBusiness(id: number) {
    const categoryBusinessFound = await this.categoryBusinessRepository.findOne({
      where: {
          id,
      },
    });
    if (!categoryBusinessFound) {
      throw new HttpException('Categoría de negocio no encontrada', HttpStatus.NOT_FOUND);
    }
    return categoryBusinessFound;
  }

  async deleteCategoryBusiness(id: number) {
    const result = await this.categoryBusinessRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Categoría de negocio no encontrada', HttpStatus.NOT_FOUND);
    }
    return 'Categoría de negocio eliminada correctamente';
  }

  async updateCategoryBusiness(id: number, categoryBusiness: UpdateCategoryBusinessDto) {
    await this.getCategoryBusiness(id); 
    await this.categoryBusinessRepository.update(id, categoryBusiness);
    return 'Categoría de negocio actualizada correctamente';
  }
}
