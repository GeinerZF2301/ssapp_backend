import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { SkillsService } from './skills.service';
import {CreateSkillDto} from './dto/create-skill.dto.js'
import { UpdateSkillDto } from './dto/update-skill.dto.js';

@Controller('skills')
export class SkillsController {
    constructor(private skillService: SkillsService) { }

    @Get()
    getSkills() {
        return this.skillService.getSkills();
    }
    @Get(':id')
    getSkill(@Param('id', ParseIntPipe) id: number){
        return this.skillService.getSkill(id);
    }
    @Post()
    createSkill(@Body() newSkill : CreateSkillDto){
        return this.skillService.createSkill(newSkill);
    }
    @Delete(':id')
    deleteSkill(@Param('id', ParseIntPipe) id: number){
        return this.skillService.deleteSkill(id);
    }
    @Patch(':id')
    updateSkill(@Param('id', ParseIntPipe) id: number, @Body() skill: UpdateSkillDto ){
        return this.skillService.updateSkill(id, skill)
    }
}
