import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppResolver } from './app.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/userModule/schema/user.schema';
import { Role } from './modules/roleModule/schema/role.schema';
import { RoleModule } from './modules/roleModule/role.module';
import { UserModule } from './modules/userModule/user.module';
import { AuthModule } from './modules/authModule/auth.module';
import configuration from 'config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Survey } from './modules/surveyModule/schema/survey.schema';
import { SurveyModule } from './modules/surveyModule/survey.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SurveyQuestionsModule } from './modules/survey_questionsModule/survey_questions.module';
import { SurveyQuestions } from './modules/survey_questionsModule/schema/survey_questions.schema';
import { SurveyQuestionAnswersModule } from './modules/survey_question_answersModule/survey_question_answers.module';
import { SurveyQuestionAnswers } from './modules/survey_question_answersModule/schema/survey_question_answers.schema';
import { SurveyCommentsModule } from './modules/surveyCommentsModule/survey-comments.module';
import { SurveyComments } from './modules/surveyCommentsModule/schema/survey-comments.schema';
import { SurveyCommentLikesModule } from './modules/survey_comment_likesModule/survey_comment_likes.module';
import { SurveyCommentLikes } from './modules/survey_comment_likesModule/schema/survey_comment_likes.schema';
import { SurveyCommentReplies } from './modules/survey_comment_repliesModule/schema/survey_comment_replies.schema';
import { SurveyCommentRepliesModule } from './modules/survey_comment_repliesModule/survey_comments_replies.module';
import { CommentsGatewayModule } from './modules/comments_gatewayModule/comments_gateway.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }), 

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      introspection: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('mysqlHost'),
        port: configService.get<number>('mysqlPort'),
        username: configService.get<string>('mysqlUser'),
        password: configService.get<string>('mysqlPassword'),
        database: configService.get<string>('mysqlDatabase'),
        entities: [User, Role, Survey, SurveyQuestions, SurveyQuestionAnswers, SurveyComments, SurveyCommentLikes,SurveyCommentReplies],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),

    RoleModule,
    UserModule,
    AuthModule,
    SurveyModule,
    SurveyQuestionsModule,
    SurveyQuestionAnswersModule,
    SurveyCommentsModule, 
    SurveyCommentLikesModule,
    SurveyCommentRepliesModule,
    CommentsGatewayModule,
  ],
  providers: [AppResolver],
  exports: [],
})
export class AppModule {}
