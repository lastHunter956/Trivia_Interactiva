import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from './entity/question.entity';
import { AnswerEntity } from './entity/answerEntity.entity';
import { CreateQuestionDto } from './dto/question.dto';
import { generateId } from 'src/utils/generateId';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,

    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  // 🔹 Agregar pregunta con sus respuestas
  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const { question, category_id, answers } = createQuestionDto;

    const newQuestion = this.questionRepository.create({
      question_id: await generateId(
        this.questionRepository,
        'question_id',
        'question',
      ),
      question,
      category: { category_id: category_id },
    });

    await this.questionRepository.save(newQuestion);

    // 🔹 Guardar cada respuesta individualmente
    for (const ans of answers) {
      const uniqueAnswerId = await generateId(
        this.answerRepository,
        'answer_id',
        'answer',
      );

      const answerEntity = this.answerRepository.create({
        answer_id: uniqueAnswerId,
        answer_text: ans.answer_text,
        is_correct: ans.is_correct,
        question: newQuestion,
      });

      await this.answerRepository.save(answerEntity); // 🔹 Guardar cada respuesta una por una
    }

    return newQuestion;
  }

  // 🔹 Listar preguntas por categoría
  async findRandomByCategory(
    category_id: string,
    limit: number = 5,
  ): Promise<QuestionEntity[]> {
    const questions = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.answers', 'answers')
      .leftJoinAndSelect('question.category', 'category')
      .where('question.category_id = :category_id', { category_id })
      .orderBy('random()')
      .limit(limit)
      .getMany();

    if (!questions.length) {
      throw new NotFoundException(
        'No se encontraron preguntas en esta categoría.',
      );
    }

    return questions;
  }

  // 🔹 Obtener preguntas de forma aleatoria con una cantidad específica
  async getRandomQuestions(amount: number): Promise<QuestionEntity[]> {
    const questions = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.answers', 'answers')
      .orderBy('RANDOM()') // PostgreSQL usa RANDOM(), para MySQL usa RAND()
      .limit(amount)
      .getMany();

    if (!questions.length) {
      throw new NotFoundException('No hay suficientes preguntas.');
    }

    return questions;
  }
}
