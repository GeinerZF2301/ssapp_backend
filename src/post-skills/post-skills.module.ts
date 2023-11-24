import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostHiring } from 'src/post-hirings/post-hiring.entity';
import { Skill } from 'src/skills/skill.entity';
import { PostSkillsController } from './post-skills.controller';
import { PostSkillsService } from './post-skills.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostHiring, Skill])],
    controllers: [PostSkillsController],
    providers: [PostSkillsService ]
})
export class PostSkillsModule {}
