import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { ReviewsService } from './reviews.service'; 
import { CreateReviewDto } from './dto/create-review.dto.js'; 
import { UpdateReviewDto } from './dto/update-review.dto.js'; 

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) { }

  @Get()
  getReviews() {
    return this.reviewService.getReviews();
  }

  @Get(':id')
  getReview(@Param('id', ParseIntPipe) id: number){
    return this.reviewService.getReview(id);
  }

  @Post()
  createReview(@Body() newReview : CreateReviewDto){
    return this.reviewService.createReview(newReview);
  }

  @Delete(':id')
  deleteReview(@Param('id', ParseIntPipe) id: number){
    return this.reviewService.deleteReview(id);
  }

  @Patch(':id')
  updateReview(@Param('id', ParseIntPipe) id: number, @Body() review: UpdateReviewDto ){
    return this.reviewService.updateReview(id, review)
  }
}
