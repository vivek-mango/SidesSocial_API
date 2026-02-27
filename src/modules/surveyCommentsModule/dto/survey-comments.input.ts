import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class CreateSurveyCommentInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  survey_id: number;

  @Field()
  @IsNotEmpty()
  comment: string;
}