import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { CategorySkillService } from '../category-skills/category-skills.service';
import { CategorySkill } from '../category-skills/category-skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, CategorySkill])],
  controllers: [SkillsController],
  providers: [SkillsService, CategorySkillService]
})
export class SkillsModule {}
