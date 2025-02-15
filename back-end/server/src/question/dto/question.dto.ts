import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AnswerDto {
  @IsString()
  @IsNotEmpty()
  answer_text: string;

  @IsNotEmpty()
  is_correct: boolean;
}

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(3, { message: 'Debe haber al menos 3 respuestas.' })
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
