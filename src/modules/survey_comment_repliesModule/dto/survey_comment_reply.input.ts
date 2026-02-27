import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class CreateSurveyCommentReplyInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  comment_id: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt() 
  user_id: number;

  @Field()
  @IsNotEmpty()
  reply_comment: string;
}
