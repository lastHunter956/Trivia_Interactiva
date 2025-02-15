import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { QuestionEntity } from 'src/question/entity/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, QuestionEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
