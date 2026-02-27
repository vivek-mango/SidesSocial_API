import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyCommentsResolver } from './survey-comments.resolver';
import { SurveyCommentsService } from './survey-comments.service';
import { SurveyComments } from './schema/survey-comments.schema';
import { SurveyQuestions } from '../survey_questionsModule/schema/survey_questions.schema';
import { SurveyQuestionAnswers } from '../survey_question_answersModule/schema/survey_question_answers.schema';
import { SurveyCommentLikes } from '../survey_comment_likesModule/schema/survey_comment_likes.schema';
import { SurveyCommentRepliesModule } from '../survey_comment_repliesModule/survey_comments_replies.module';
import { CommentsGatewayModule } from '../comments_gatewayModule/comments_gateway.module';
import { CommentsGateway } from '../comments_gatewayModule/comments.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SurveyComments,
      SurveyQuestions,
      SurveyQuestionAnswers,
      SurveyCommentLikes,
      SurveyCommentRepliesModule,
      CommentsGatewayModule,
    ]),
  ],
  providers: [SurveyCommentsResolver, SurveyCommentsService, CommentsGateway],
})
export class SurveyCommentsModule {}
