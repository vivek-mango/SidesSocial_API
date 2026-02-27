import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsBoolean } from 'class-validator';

@InputType()
export class SurveyCommentLikesInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  comment_id: number;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  is_like: boolean;
}
