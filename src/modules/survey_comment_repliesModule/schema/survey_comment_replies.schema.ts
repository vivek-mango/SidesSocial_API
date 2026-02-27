import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SurveyComments } from '../../surveyCommentsModule/schema/survey-comments.schema';
import { User } from '../../userModule/schema/user.schema';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity({ name: 'survey_comment_replies' })
@ObjectType()
export class SurveyCommentReplies {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  comment_id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  user_id: number;

  @Column({ length: 255 })
  @Field(() => String)
  reply_comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  updated_at: Date;

  @ManyToOne(() => SurveyComments, (surveyComment) => surveyComment.survey_comment_replies)
  @JoinColumn({ name: 'comment_id' })
  surveyComment: SurveyComments;

  @ManyToOne(() => User, (user) => user.survey_comment_replies)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
