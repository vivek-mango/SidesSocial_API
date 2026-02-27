import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyCommentRepliesResolver } from './survey_comment_replies.resolver';
import { SurveyCommentRepliesService } from './survey_comment_replies.service';
import { SurveyCommentReplies } from './schema/survey_comment_replies.schema';
import { CommentsGateway } from '../comments_gatewayModule/comments.gateway';
import { CommentsGatewayModule } from '../comments_gatewayModule/comments_gateway.module';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyCommentReplies, CommentsGatewayModule])],
  providers: [SurveyCommentRepliesResolver, SurveyCommentRepliesService, CommentsGateway],
  exports: [SurveyCommentRepliesService],
})
export class SurveyCommentRepliesModule {}
