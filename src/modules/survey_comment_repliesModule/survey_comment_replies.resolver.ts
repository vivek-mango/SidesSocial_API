import {
  Resolver,
  ResolveField,
  Args,
  Int,
  Mutation,
  Query,
} from '@nestjs/graphql';
import { SurveyCommentRepliesService } from './survey_comment_replies.service';
import { SurveyCommentReplies } from './schema/survey_comment_replies.schema';
import { CreateSurveyCommentReplyInput } from './dto/survey_comment_reply.input';

@Resolver(() => SurveyCommentReplies)
export class SurveyCommentRepliesResolver {
  constructor(
    private surveyCommentRepliesService: SurveyCommentRepliesService,
  ) {}

  @Mutation(() => SurveyCommentReplies)
  async createCommentReply(
    @Args('createSurveyCommentReplyData')
    createSurveyCommentReplyData: CreateSurveyCommentReplyInput,
  ): Promise<SurveyCommentReplies> {
    return this.surveyCommentRepliesService.createCommentReply(
      createSurveyCommentReplyData,
    );
  }

  @Query(() => [SurveyCommentReplies])
  async getCommentRepliesByCommentId(
    @Args('commentId', { type: () => Int }) commentId: number,
  ): Promise<SurveyCommentReplies[]> {
    return this.surveyCommentRepliesService.getCommentRepliesByCommentId(
      commentId,
    );
  }

  @Query(() => [SurveyCommentReplies])
  async getCommentRepliesByReplyId(
    @Args('replyId', { type: () => Int }) replyId: number,
  ): Promise<SurveyCommentReplies[]> {
    return this.surveyCommentRepliesService.getCommentRepliesByReplyId(replyId);
  }
}
