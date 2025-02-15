import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AbstractEntity } from "src/default/abstract.entity";
import { UserEntity } from "src/user/entity/user.entity";

@Entity({name: 'refresh_tokens'})
export class refreshTokensEntity extends AbstractEntity {

    @PrimaryColumn({type: 'varchar', length: 500})
    id: string;

    @Column({ type: 'timestamp' })
    expyreDate: Date;

    @ManyToOne(() => UserEntity, user => user.refreshTokens)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
