import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { AbstractEntity } from '../../default/abstract.entity';
import { refreshTokensEntity } from '../../auth/entity/refreshToken.entity';
import { resetTokenEntity } from 'src/auth/entity/resetToken.entity';
import { TypeUserEntity } from 'src/type-user/entity/type-user.entity';
import { ScoreEntity } from 'src/score/entity/score.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @PrimaryColumn({ type: 'varchar', length: 500 })
  id: string;

  @Column({ type: 'varchar', length: 500, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 500 })
  password: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  lastName: string;

  @OneToMany(() => refreshTokensEntity, (refreshTokens) => refreshTokens.user)
  refreshTokens: refreshTokensEntity[];

  @OneToMany(() => resetTokenEntity, (resetTokens) => resetTokens.user_id)
  resetTokens: resetTokenEntity[];

  @ManyToOne(() => TypeUserEntity, (typeUser) => typeUser.users, {
    nullable: false,
  })
  @JoinColumn({ name: 'type_id' })
  typeUser: TypeUserEntity;

  @OneToOne(() => ScoreEntity, (score) => score.user, { cascade: true })
  @JoinColumn({name: "score_id"}) 
  score: ScoreEntity;
}
