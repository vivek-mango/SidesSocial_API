import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SurveyCommentLikesService } from './survey_comment_likes.service';
import { SurveyCommentLikes } from './schema/survey_comment_likes.schema';
import { SurveyCommentLikesInput } from './dto/survey_comment_likes.input';

@Resolver(() => SurveyCommentLikes)
export class SurveyCommentLikesResolver {
  constructor(private surveyCommentLikesService: SurveyCommentLikesService) {}

  @Mutation(() => SurveyCommentLikes, { nullable: true }) 
  async addOrUpdateCommentLike(
    @Args('surveyCommentLikesInput') surveyCommentLikesInput: SurveyCommentLikesInput,
  ): Promise<SurveyCommentLikes> {
    const result = await this.surveyCommentLikesService.addOrUpdateCommentLike(surveyCommentLikesInput);
    if (result === null) {
      // If the existing data is being removed, return null
      return null;
    }
    return result;
  }
}
