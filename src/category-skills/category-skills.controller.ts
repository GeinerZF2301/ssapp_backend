import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Patch,
} from '@nestjs/common/decorators';
import { CategorySkillService } from './category-skills.service';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCategorySkillDto } from './dto/create-category-skill.dto';
import { UpdateCategorySkillDto } from './dto/update-category-skill.dto';

@Controller('category-skills')
export class CategorySkillController {
    constructor(private categorySkillService: CategorySkillService) { }

    @Get()
    getCategorySkills() {
        return this.categorySkillService.getCategories();
    }
    @Get(':id')
    getCategorySkill(@Param('id', ParseIntPipe) id: number) {
        return this.categorySkillService.getCategory(id);
    }
    @Post()
    createCategorySkill(@Body() newCategorySkill: CreateCategorySkillDto) {
        return this.categorySkillService.createCategorySkill(newCategorySkill);
    }
    @Delete(':id')
    deleteCategorySkill(@Param('id', ParseIntPipe) id: number) {
        return this.categorySkillService.deleteCategory(id);
    }
    @Patch(':id')
    updateCategorySkill(
        @Param('id', ParseIntPipe) id: number,
        @Body() categorySkillUpdate: UpdateCategorySkillDto) {
        return this.categorySkillService.updateCategory(id, categorySkillUpdate);
    }
}
