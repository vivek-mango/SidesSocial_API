import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../userModule/schema/user.schema';
import { SurveyComments } from '../../surveyCommentsModule/schema/survey-comments.schema';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity({ name: 'survey_comment_likes' })
@ObjectType()
@Unique(['user_id', 'comment_id'])
export class SurveyCommentLikes {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  user_id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  comment_id: number;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  is_like: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => SurveyComments, (surveyComment) => surveyComment.id)
  @JoinColumn({ name: 'comment_id' })
  surveyComment: SurveyComments;
}
