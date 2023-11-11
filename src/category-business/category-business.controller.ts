import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CategoryBusinessService } from './category-business.service';
import { CreateCategoryBusinessDto } from './dto/create-category-business.dto.js';
import { UpdateCategoryBusinessDto } from './dto/update-category-business.dto.js';

@Controller('category-business')
export class CategoryBusinessController {
  constructor(private readonly categoryBusinessService: CategoryBusinessService) {}

  @Get()
  getCategoryBusinesses() {
    return this.categoryBusinessService.getCategoryBusinesses();
  }

  @Get(':id')
  getCategoryBusiness(@Param('id') id: number) {
    return this.categoryBusinessService.getCategoryBusiness(id);
  }

  @Post()
  createCategoryBusiness(@Body() newCategoryBusiness: CreateCategoryBusinessDto) {
    return this.categoryBusinessService.createCategoryBusiness(newCategoryBusiness);
  }

  @Delete(':id')
  deleteCategoryBusiness(@Param('id') id: number) {
    return this.categoryBusinessService.deleteCategoryBusiness(id);
  }

  @Patch(':id')
  updateCategoryBusiness(@Param('id') id: number, @Body() categoryBusiness: UpdateCategoryBusinessDto) {
    return this.categoryBusinessService.updateCategoryBusiness(id, categoryBusiness);
  }
}
