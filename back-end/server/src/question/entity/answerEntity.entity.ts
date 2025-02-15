import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { QuestionEntity } from 'src/question/entity/question.entity';

@Entity({ name: 'answers' })
export class AnswerEntity {
  @PrimaryColumn({type:'varchar', length:500})
  answer_id: string;

  @Column({ type: 'varchar', length: 500 })
  answer_text: string;

  @Column({ type: 'boolean', default: false })
  is_correct: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.answers, { onDelete: 'CASCADE' })
  question: QuestionEntity;
}
