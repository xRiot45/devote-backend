import { StatusEnum } from 'src/enums/status.enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProposalOption } from './proposal-option.entity';

@Entity('proposals')
export class Proposal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    creatorWallet: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    category: string;

    @Column({
        type: 'datetime',
        nullable: false,
    })
    startTime: Date;

    @Column({
        type: 'datetime',
        nullable: false,
    })
    endTime: Date;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.DRAFT,
        nullable: false,
    })
    status: string | StatusEnum;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @OneToMany(() => ProposalOption, (proposalOption) => proposalOption.proposal, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    proposalOptions: ProposalOption[];

    constructor(partial: Partial<Proposal>) {
        Object.assign(this, partial);
    }
}
