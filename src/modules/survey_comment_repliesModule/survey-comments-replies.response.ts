import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SurveyQuestions } from '../survey_questionsModule/schema/survey_questions.schema';
import { SurveyQuestionAnswers } from '../survey_question_answersModule/schema/survey_question_answers.schema';
import { SurveyCommentReplies } from './schema/survey_comment_replies.schema';

@ObjectType()
export class SurveyCommentsRepliesResponse {
  @Field(() => [SurveyCommentReplies])
  SurveyCommentReplies: SurveyCommentReplies[];

  @Field(() => SurveyQuestions, { nullable: true })
  primaryQuestion: SurveyQuestions;

  @Field(() => [SurveyQuestionAnswers], { nullable: 'itemsAndList' })
  primaryQuestionAnswers: SurveyQuestionAnswers[];
}
