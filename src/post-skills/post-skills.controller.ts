import { Body, Controller, Param, Post } from "@nestjs/common";
import { PostSkillsService } from "./post-skills.service";

@Controller('post-skills')
export class PostSkillsController{
    constructor(private userSkillsService : PostSkillsService){}

    // @Post(':postId/skills')
    // async addSkillsToPostHiring(
    //     @Param('postId') postHiringId: number,
    //     @Body() skillIds: number[]) {
    //     return await this.userSkillsService.addSkillsToPostHiring(postHiringId, skillIds);
    // }

}