import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { AbstractEntity } from 'src/default/abstract.entity';

@Entity('scores')
export class ScoreEntity extends AbstractEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.score)
  user: UserEntity;

  @Column({ type: 'int', default: 0 })
  totalScore: number;
}
