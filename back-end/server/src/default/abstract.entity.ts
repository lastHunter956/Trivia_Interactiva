import { Column } from 'typeorm';

export abstract class AbstractEntity {
  @Column({
    type: 'timestamp',
    default: () => 'current_timestamp',
  })
  createdAt = new Date();

  @Column({
    type: 'timestamp',
    default: () => 'current_timestamp',
  })
  updatedAt = new Date();

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
