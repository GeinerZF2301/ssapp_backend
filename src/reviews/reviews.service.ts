import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './reviews.entity'; 
import { CreateReviewDto } from './dto/create-review.dto.js'; 
import { UpdateReviewDto } from './dto/update-review.dto.js'; 

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async createReview(review: CreateReviewDto) {
    const newReview = this.reviewRepository.create(review);
    await this.reviewRepository.save(newReview);
    return 'Review creada exitosamente';
  }

  async getReviews() {
    return this.reviewRepository.find();
  }

  async getReview(id: number) {
    const reviewFound = await this.reviewRepository.findOne({
      where: {
          id,
      },
  });
    if (!reviewFound) {
      throw new HttpException('Review No Encontrada', HttpStatus.NOT_FOUND);
    }
    return reviewFound;
  }

  async deleteReview(id: number) {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Review No Encontrada', HttpStatus.NOT_FOUND);
    }
    return 'Review eliminada correctamente';
  }

  async updateReview(id: number, review: UpdateReviewDto) {
    await this.getReview(id); // Verificar si la revisión existe antes de actualizar
    await this.reviewRepository.update(id, review);
    return 'Review actualizada correctamente';
  }
}
