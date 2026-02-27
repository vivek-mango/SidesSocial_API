import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../userModule/schema/user.schema';
import { Survey } from '../../surveyModule/schema/survey.schema';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SurveyCommentReplies } from 'src/modules/survey_comment_repliesModule/schema/survey_comment_replies.schema';

@Entity({ name: 'survey_comments' })
@ObjectType()
export class SurveyComments {
 @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 255})
  @Field(() => String)
  comment: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  user_id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  survey_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.survey)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Survey, (survey) => survey.id)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @Field(() => Int, { nullable: true })
  likes: number;

  @Field(() => Int, { nullable: true })
  dislikes: number;

  @OneToMany(() => SurveyCommentReplies, (surveyCommentReply) => surveyCommentReply.surveyComment)
  @Field(() => [SurveyCommentReplies], { nullable: 'itemsAndList' })
  survey_comment_replies: SurveyCommentReplies[];

}
