import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyCommentLikes } from './schema/survey_comment_likes.schema';
import { SurveyCommentLikesInput } from './dto/survey_comment_likes.input';

@Injectable()
export class SurveyCommentLikesService {
  constructor(
    @InjectRepository(SurveyCommentLikes)
    private surveyCommentLikesRepository: Repository<SurveyCommentLikes>,
  ) {}

  async addOrUpdateCommentLike(surveyCommentLikesInput: SurveyCommentLikesInput): Promise<SurveyCommentLikes> {
    const { user_id, comment_id, is_like } = surveyCommentLikesInput;

    const existingLike = await this.surveyCommentLikesRepository.findOne({
      where: { user_id, comment_id },
    });

    if (existingLike) {
      if (existingLike.is_like === is_like) {
        // If the existing like/dislike matches the new request, remove the record
        await this.surveyCommentLikesRepository.remove(existingLike);
        return null;
      } else {
        // If the existing like/dislike is different from the new request, update the record
        existingLike.is_like = is_like;
        return this.surveyCommentLikesRepository.save(existingLike);
      }
    } else {
      // If no existing record, create a new one
      const newLike = this.surveyCommentLikesRepository.create(surveyCommentLikesInput);
      return this.surveyCommentLikesRepository.save(newLike);
    }
  }
}
