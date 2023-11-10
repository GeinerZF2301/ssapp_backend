import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySkill } from './category-skill.entity';
import { CategorySkillController } from './category-skills.controller';
import { CategorySkillService } from './category-skills.service';

@Module({
    imports: [TypeOrmModule.forFeature([CategorySkill])],
    controllers: [CategorySkillController],
    providers: [CategorySkillService]
})
export class CategorySkillsModule {}
