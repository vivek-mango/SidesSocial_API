import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { AuthGuard } from 'src/middleware/authentication';
import { UseGuards } from '@nestjs/common';
import { SurveyQuestionAnswersService } from './survey_question_answers.service';
import { SurveyQuestionAnswerInput } from './dto/survey_question_answer_input';
import { SurveyQuestionAnswers } from './schema/survey_question_answers.schema';
import { UserService } from '../userModule/user.service';

@Resolver(() => SurveyQuestionAnswers)
export class SurveyQuestionAnswersResolver {
  constructor(
    private surveyQuestionAnswersService: SurveyQuestionAnswersService,
    private userService: UserService,
  ) {}

  //save survey question answers
  @Mutation(() => SurveyQuestionAnswers)
  @UseGuards(AuthGuard)
  async saveSurveyQuestionAnswer(
    @Args('surveyQuestionAnswerData')
    saveSurveyQuestionAnswerData: SurveyQuestionAnswerInput,
  ) {
    const savedSurveyQuestionAnswer = await this.surveyQuestionAnswersService.saveSurveyQuestionAnswer(
      saveSurveyQuestionAnswerData,
    );


    const user = await this.userService.findById(savedSurveyQuestionAnswer.user_id);
    savedSurveyQuestionAnswer.user = user;
    return savedSurveyQuestionAnswer;

    // return this.surveyQuestionAnswersService.saveSurveyQuestionAnswer(
    //   saveSurveyQuestionAnswerData,
    // );
  }

  //get survey question answers details by id
  @Query(() => SurveyQuestionAnswers)
  @UseGuards(AuthGuard)
  async getSurveyQuestionAnswerDetailsById(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.surveyQuestionAnswersService.getSurveyQuestionAnswerDetails(id);
  }
}
