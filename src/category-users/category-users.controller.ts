import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CategoryUserService } from './category-users.service';
import { CreateCategoryUserDto } from './dto/create-category-user.dto.js';
import { UpdateCategoryUserDto } from './dto/update-category-user.dto.js';

@Controller('category-users')
export class CategoryUsersController {
  constructor(private readonly categoryUserService: CategoryUserService) {}

  @Get()
  getCategoryBusinesses() {
    return this.categoryUserService.getCategoryUsers();
  }

  @Get(':id')
  getCategoryBusiness(@Param('id') id: number) {
    return this.categoryUserService.getCategoryUser(id);
  }

  @Post()
  createCategoryBusiness(@Body() newCategoryUser: CreateCategoryUserDto) {
    return this.categoryUserService.createCategoryUser(newCategoryUser);
  }

  @Delete(':id')
  deleteCategoryBusiness(@Param('id') id: number) {
    return this.categoryUserService.deleteCategoryUser(id);
  }

  @Patch(':id')
  updateCategoryBusiness(@Param('id') id: number, @Body() categoryUser: UpdateCategoryUserDto) {
    return this.categoryUserService.updateCategoryUser(id, categoryUser)
    
  }
}