import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { SurveyCommentsService } from './survey-comments.service';
import { SurveyComments } from './schema/survey-comments.schema';
import { CreateSurveyCommentInput } from './dto/survey-comments.input';
import { SurveyCommentsResponse, SurveyCommentsResponseByID } from './survey-comments.response';

@Resolver(() => SurveyComments)
export class SurveyCommentsResolver {
  constructor(private surveyCommentsService: SurveyCommentsService) {}

  @Mutation(() => SurveyComments)
  async createComment(
    @Args('createSurveyCommentData')
    createSurveyCommentData: CreateSurveyCommentInput,
  ): Promise<SurveyComments> {
    return this.surveyCommentsService.createComment(createSurveyCommentData);
  }

  @Query(() => SurveyCommentsResponse)
  async getSurveyCommentsBySurveyID(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<SurveyCommentsResponse> {
    return this.surveyCommentsService.getSurveyCommentsBySurveyID(
      surveyId,
      page,
      limit,
    );
  }

  @Query(() => SurveyCommentsResponseByID)
  async getSurveyCommentByCommentId(
    @Args('commentId', { type: () => Int }) commentId: number,
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ): Promise<SurveyCommentsResponseByID> {
    return this.surveyCommentsService.getSurveyCommentByCommentId(commentId,surveyId);
    
  }
}
