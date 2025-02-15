import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AbstractEntity } from 'src/default/abstract.entity';
import { AnswerEntity } from './answerEntity.entity';
import { CategoryEntity } from 'src/category/entity/category.entity';

@Entity({ name: 'questions' })
export class QuestionEntity extends AbstractEntity {
  @PrimaryColumn({ type: 'varchar', length: 500 })
  question_id: string;

  @Column({ type: 'varchar', length: 500 })
  question: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.question, { cascade: true })
  answers: AnswerEntity[];

  // Relación Muchos a Uno con CategoryEntity
  @ManyToOne(() => CategoryEntity, (category) => category.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'category_id'})
  category: CategoryEntity;
}
