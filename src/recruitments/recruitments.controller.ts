import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { RecruitmentsService } from './recruitments.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto.js'; 
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto.js'; 

@Controller('recruitments')
export class RecruitmentsController {
  constructor(private readonly recruitmentService: RecruitmentsService) { }

  @Get()
  getRecruitments() {
    return this.recruitmentService.getRecruitments();
  }

  @Get(':id')
  getRecruitment(@Param('id', ParseIntPipe) id: number){
    return this.recruitmentService.getRecruitment(id);
  }

  @Post()
  createRecruitment(@Body() newRecruitment : CreateRecruitmentDto){
    return this.recruitmentService.createRecruitment(newRecruitment);
  }

  @Delete(':id')
  deleteRecruitment(@Param('id', ParseIntPipe) id: number){
    return this.recruitmentService.deleteRecruitment(id);
  }

  @Patch(':id')
  updateRecruitment(@Param('id', ParseIntPipe) id: number, @Body() recruitment: UpdateRecruitmentDto ){
    return this.recruitmentService.updateRecruitment(id, recruitment)
  }
}
