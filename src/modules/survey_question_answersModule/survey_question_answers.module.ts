import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestionAnswersResolver } from './survey_question_answers_resolver';
import { SurveyQuestionAnswers } from './schema/survey_question_answers.schema';
import { SurveyQuestionAnswersService } from './survey_question_answers.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../userModule/user.module';
import { UserService } from '../userModule/user.service';
import { User } from '../userModule/schema/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestionAnswers, User]), UserModule],
  providers: [
    SurveyQuestionAnswersResolver,
    SurveyQuestionAnswersService,
    JwtService,
    UserService
  ],
})
export class SurveyQuestionAnswersModule {}
