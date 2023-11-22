import { Body, Controller, Delete, Post } from "@nestjs/common";
import { ProfileSkillsService } from "./profile-skills.service";
import { addSkillsToProfileDto } from "./dto/addSkillsToProfile.dto";
import { removeSkillsToProfileDto } from "./dto/removeSkillsToProfile.dto";


@Controller('profile-skills')
export class ProfileSkillsController{
    constructor(private profileSkillsService : ProfileSkillsService){}

    @Post()
    async addSkillsToPostHiring(
        @Body() skillsToPost : addSkillsToProfileDto ) {
        return await this.profileSkillsService.addSkillsToProfile(skillsToPost);
    }
    @Delete()
    async removeSkillsToPostHiring(
        @Body() skillsToRemove : removeSkillsToProfileDto) {
        return await this.profileSkillsService.deleteSkillsToProfile(skillsToRemove);
    }

}