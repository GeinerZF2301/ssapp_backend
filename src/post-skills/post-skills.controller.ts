import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { PostSkillsService } from "./post-skills.service";
import { addSkillsToPostDto } from "./dto/addSkillsToPost.dto";
import { removeSkillsToPostDto } from "./dto/removeSkillsToPost.dto";

@Controller('post-skills')
export class PostSkillsController{
    constructor(private postSkillsService : PostSkillsService){}

    @Post()
    async addSkillsToPostHiring(
        @Body() skillsToPost : addSkillsToPostDto ) {
        return await this.postSkillsService.addSkillsToPostHiring(skillsToPost);
    }
    @Delete()
    async removeSkillsToPostHiring(
        @Body() skillsToRemove : removeSkillsToPostDto) {
        return await this.postSkillsService.deleteSkillsToPost(skillsToRemove);
    }

}