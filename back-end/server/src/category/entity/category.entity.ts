import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/default/abstract.entity';
import { QuestionEntity } from 'src/question/entity/question.entity';

@Entity({ name: 'category_question' })
export class CategoryEntity extends AbstractEntity {
  @PrimaryColumn({ type: 'varchar', length: 500 })
  category_id: string;

  @Column({ type: 'varchar', length: 500 })
  category_name: string;

  @Column({ type: 'varchar', length: 500 })
  category_description: string;

  // Relación Uno a Muchos con QuestionEntity
  @OneToMany(() => QuestionEntity, (question) => question.category)
  questions: QuestionEntity[];
}
