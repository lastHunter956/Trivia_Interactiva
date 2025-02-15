import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { AnswerEntity } from './entity/answerEntity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, CategoryEntity, AnswerEntity])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
