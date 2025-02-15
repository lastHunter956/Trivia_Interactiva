import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/default/abstract.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity({ name: 'type_user' })
export class TypeUserEntity extends AbstractEntity {
  @PrimaryColumn({ type: 'varchar', length: 500 })
  id_type: string;

  @Column({ type: 'varchar', length: 500 })
  type_name: string;

  @Column({ type: 'varchar', length: 500 })
  type_description: string;

  // Relación con UserEntity (Uno a Muchos)
  @OneToMany(() => UserEntity, (user) => user.typeUser)
  users: UserEntity[];
}
