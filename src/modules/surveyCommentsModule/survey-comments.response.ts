import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SurveyComments } from './schema/survey-comments.schema';
import { SurveyQuestions } from '../survey_questionsModule/schema/survey_questions.schema';
import { SurveyQuestionAnswers } from '../survey_question_answersModule/schema/survey_question_answers.schema';

@ObjectType()
export class SurveyCommentsResponse {
  @Field(() => [SurveyComments])
  surveyComments: SurveyComments[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => SurveyQuestions, { nullable: true })
  primaryQuestion: SurveyQuestions;

  @Field(() => [SurveyQuestionAnswers], { nullable: 'itemsAndList' })
  primaryQuestionAnswers: SurveyQuestionAnswers[];
}


@ObjectType()
export class SurveyCommentsResponseByID {
  @Field(() => [SurveyComments])
  surveyComments: SurveyComments[];

  @Field(() => SurveyQuestions, { nullable: true })
  primaryQuestion: SurveyQuestions;

  @Field(() => [SurveyQuestionAnswers], { nullable: 'itemsAndList' })
  primaryQuestionAnswers: SurveyQuestionAnswers[];
}
