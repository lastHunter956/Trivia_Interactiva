import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/question.dto';
import { QuestionEntity } from './entity/question.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('question')
@UseGuards(AuthGuard)
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // 📌 1️⃣ Crear una pregunta con respuestas
  @Post()
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return await this.questionService.create(createQuestionDto);
  }

  // 📌 2️⃣ Obtener preguntas aleatorias por categoría
  @Get('category/:category_id')
  async getRandomByCategory(
    @Param('category_id') category_id: string,
    @Query('limit') limit?: number,
  ): Promise<QuestionEntity[]> {
    const questionLimit = limit ? Number(limit) : 5; // Valor por defecto: 5 preguntas
    return await this.questionService.findRandomByCategory(
      category_id,
      questionLimit,
    );
  }

  // 📌 3️⃣ Obtener preguntas aleatorias
  @Get('category/random/question')
  async getRandom(@Query('limit') limit?: number): Promise<QuestionEntity[]> {
    const questionLimit = limit ? Number(limit) : 5; // Valor por defecto: 5 preguntas
    return await this.questionService.getRandomQuestions(questionLimit);
  }
}
