import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyCommentLikes } from './schema/survey_comment_likes.schema';
import { SurveyCommentLikesResolver } from './survey_comment_likes.resolver';
import { SurveyCommentLikesService } from './survey_comment_likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyCommentLikes])],
  providers: [SurveyCommentLikesResolver, SurveyCommentLikesService],
})
export class SurveyCommentLikesModule {}
