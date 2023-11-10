import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { PostHiringsService } from "./post-hiring.service";
import { CreatePostHiringDto } from "./dto/create-post-hiring.dto";
import { UpdatePostHiringDto } from "./dto/update-post-hiring.dto";


@Controller('post-hirings')
export class PostHiringsController {
    constructor(private postHiringService: PostHiringsService) { }

    @Get()
    getPostHirings() {
        return this.postHiringService.getPostHirings();
    }
    @Get(':id')
    getPostHiring(@Param('id', ParseIntPipe) id: number) {
        return this.postHiringService.getPostHiringById(id);
    }
    @Post()
    createPostHiring(@Body() newPostHiring: CreatePostHiringDto) {
        return this.postHiringService.createPostHiring(newPostHiring);
    }
    @Delete(':id')
    deletePostHiring(@Param('id', ParseIntPipe) id: number) {
        return this.postHiringService.deletePostHiring(id);
    }
    @Patch(':id')
    updatePostHiring(
        @Param('id', ParseIntPipe) id: number,
        @Body() postHiringUpdate: UpdatePostHiringDto) {
        return this.postHiringService.updatePostHiring(id, postHiringUpdate)
    }
    
}
