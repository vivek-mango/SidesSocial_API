import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyCommentReplies } from './schema/survey_comment_replies.schema';
import { CreateSurveyCommentReplyInput } from './dto/survey_comment_reply.input';
import { CommentsGateway } from '../comments_gatewayModule/comments.gateway';

@Injectable()
export class SurveyCommentRepliesService {
  constructor(
    @InjectRepository(SurveyCommentReplies)
    private surveyCommentRepliesRepository: Repository<SurveyCommentReplies>,
    private commentsGateway: CommentsGateway,
  ) {}

  async createCommentReply(
    createSurveyCommentReplyData: CreateSurveyCommentReplyInput,
  ): Promise<SurveyCommentReplies> {
    const newReply = this.surveyCommentRepliesRepository.create(
      createSurveyCommentReplyData,
    );
    const savedReply = await this.surveyCommentRepliesRepository.save(newReply);
    this.commentsGateway.server.emit('newReply', savedReply);
    return savedReply;
  }

  async getCommentRepliesByCommentId(
    commentId: number,
  ): Promise<SurveyCommentReplies[]> {
    return this.surveyCommentRepliesRepository.find({
      where: { comment_id: commentId },
      relations: ['user', 'surveyComment'],
    });
  }

  async getCommentRepliesByReplyId(
    replyId: number,
  ): Promise<SurveyCommentReplies[]> {
    return this.surveyCommentRepliesRepository.find({
      where: { id: replyId },
      relations: ['user', 'surveyComment'],
    });
  }
}
