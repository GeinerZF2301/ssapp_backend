import { InjectRepository } from "@nestjs/typeorm";
import { CategorySkill } from "./category-skill.entity";
import { Repository } from "typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateCategorySkillDto } from "./dto/create-category-skill.dto";
import { UpdateCategorySkillDto } from "./dto/update-category-skill.dto";


@Injectable()
export class CategorySkillService{
    constructor(
        @InjectRepository(CategorySkill) private categorySkillRepository : Repository <CategorySkill>,
    ){}

    async createCategorySkill(category: CreateCategorySkillDto){
        try {
            const categoryFound = await this.categorySkillRepository.findOne({
                where:{
                    name: category.name,
                },
            });
            if(!categoryFound){
                const newCategory = this.categorySkillRepository.create({
                    name: category.name
                });
                await this.categorySkillRepository.save(newCategory);
                return {message: "Categoria creada exitosamente"};
            }else{
              throw new HttpException("Ya existe una categoria con ese nombre", HttpStatus.BAD_REQUEST)  
            }
            
        } catch (error) {
            console.error(error);
            throw new HttpException('Ocurrió un error durante el registro', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getCategories(){
        return this.categorySkillRepository.find();
    }
    async getCategory(id: number){
        const categoryFound = await this.categorySkillRepository.findOne({
            where:{
                id,
            },
        });
        if(!categoryFound){
            throw new HttpException("Categoria no encontrada",HttpStatus.NOT_FOUND)
        }
        return categoryFound;
    }
    async deleteCategory(id: number){
        const result = await this.categorySkillRepository.delete({id});
        if(result.affected === 0){
            throw new HttpException("Categoria no encontrada", HttpStatus.NOT_FOUND)
        }
        return {message: "Categoria eliminada correctamente", status: HttpStatus.OK}
    }
    updateCategory(id:number, category: UpdateCategorySkillDto){
        return this.categorySkillRepository.update({id}, category);
    }
}