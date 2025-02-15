import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn  } from "typeorm";
import { AbstractEntity } from "src/default/abstract.entity";
import { UserEntity } from "src/user/entity/user.entity";

@Entity({name: 'reset_tokens'})
export class resetTokenEntity  extends AbstractEntity {
    @PrimaryColumn({ primary: true })
    id: string;

    @Column({ type: 'timestamp' })
    expyreDate: Date;

    @ManyToOne(() => UserEntity, user => user.resetTokens)
    @JoinColumn({ name: 'user_id' })
    user_id: string;
}
