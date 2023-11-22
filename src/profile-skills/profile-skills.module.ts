import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { Skill } from 'src/skills/skill.entity';
import { ProfileSkillsController } from './profile-skills.controller';
import { ProfileSkillsService } from './profile-skills.service';

@Module({
    imports: [TypeOrmModule.forFeature([Profile, Skill])],
    controllers: [ProfileSkillsController],
    providers: [ProfileSkillsService]

})
export class ProfileSkillsModule {}
