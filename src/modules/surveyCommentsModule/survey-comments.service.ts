import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyComments } from './schema/survey-comments.schema';
import { CreateSurveyCommentInput } from './dto/survey-comments.input';
import { SurveyQuestions } from '../survey_questionsModule/schema/survey_questions.schema';
import { SurveyQuestionAnswers } from '../survey_question_answersModule/schema/survey_question_answers.schema';
import { SurveyCommentLikes } from '../survey_comment_likesModule/schema/survey_comment_likes.schema';
import { CommentsGateway } from '../comments_gatewayModule/comments.gateway';
import { SurveyCommentsResponseByID } from './survey-comments.response';

interface SurveyCommentsResponse {
  surveyComments: SurveyComments[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  primaryQuestion: SurveyQuestions;
  primaryQuestionAnswers: SurveyQuestionAnswers[];
}

@Injectable()
export class SurveyCommentsService {
  constructor(
    @InjectRepository(SurveyComments)
    private surveyCommentsRepository: Repository<SurveyComments>,
    @InjectRepository(SurveyQuestions)
    private surveyQuestionsRepository: Repository<SurveyQuestions>,
    @InjectRepository(SurveyQuestionAnswers)
    private surveyQuestionAnswersRepository: Repository<SurveyQuestionAnswers>,
    @InjectRepository(SurveyCommentLikes)
    private surveyCommentLikesRepository: Repository<SurveyCommentLikes>,

    private commentsGateway: CommentsGateway,
  ) {}

  async createComment(
    createSurveyCommentData: CreateSurveyCommentInput,
  ): Promise<SurveyComments> {
    const newComment = this.surveyCommentsRepository.create(
      createSurveyCommentData,
    );
    const savedComment = await this.surveyCommentsRepository.save(newComment);
    this.commentsGateway.server.emit('newComment', savedComment);
    return savedComment;
  }

  async getSurveyCommentsBySurveyID(
    surveyId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<SurveyCommentsResponse> {
    const skip = (page - 1) * limit;
    const [surveyComments, totalCount] = await this.surveyCommentsRepository
      .createQueryBuilder('surveyComments')
      .leftJoinAndSelect('surveyComments.user', 'user')
      .leftJoinAndSelect('surveyComments.survey', 'survey')
      .where('survey.id = :surveyId', { surveyId })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    // Get total likes and dislikes for each comment
    for (const comment of surveyComments) {
      const likes = await this.surveyCommentLikesRepository.count({
        where: { comment_id: comment.id, is_like: true },
      });
      const dislikes = await this.surveyCommentLikesRepository.count({
        where: { comment_id: comment.id, is_like: false },
      });
      comment.likes = likes;
      comment.dislikes = dislikes;
    }

    const primaryQuestion = await this.surveyQuestionsRepository.findOne({
      where: { survey_id: surveyId, is_primary: true },
      relations: ['survey'],
    });

    const primaryQuestionAnswers =
      await this.surveyQuestionAnswersRepository.find({
        where: { question_id: primaryQuestion.id, survey_id: surveyId },
        relations: ['user'],
      });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      surveyComments,
      totalCount,
      totalPages,
      currentPage: page,
      primaryQuestion,
      primaryQuestionAnswers,
    };
  }

  async getSurveyCommentByCommentId(
    commentId: number,   
    surveyId: number,
  ): Promise<SurveyCommentsResponseByID> {
    const [surveyComments, totalCount] = await this.surveyCommentsRepository
      .createQueryBuilder('surveyComments')
      .leftJoinAndSelect('surveyComments.user', 'user')
      .leftJoinAndSelect('surveyComments.survey', 'survey')
      .where('surveyComments.id = :commentId', { commentId })
      .getManyAndCount();

    // Get total likes and dislikes for each comment
    for (const comment of surveyComments) {
      const likes = await this.surveyCommentLikesRepository.count({
        where: { comment_id: comment.id, is_like: true },
      });
      const dislikes = await this.surveyCommentLikesRepository.count({
        where: { comment_id: comment.id, is_like: false },
      });
      comment.likes = likes;
      comment.dislikes = dislikes;
    }

    const primaryQuestion = await this.surveyQuestionsRepository.findOne({
      where: { survey_id: surveyId, is_primary: true },
      relations: ['survey'],
    });

    const primaryQuestionAnswers =
      await this.surveyQuestionAnswersRepository.find({
        where: { question_id: primaryQuestion.id, survey_id: surveyId },
        relations: ['user'],
      });

    return {
      surveyComments,
      primaryQuestion,
      primaryQuestionAnswers,
    };
  }

}
