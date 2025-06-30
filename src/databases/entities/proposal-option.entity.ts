import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Proposal } from './proposal.entity';

@Entity('proposal_options')
export class ProposalOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    proposalId: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    label: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    image: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    order: number;

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

    @ManyToOne(() => Proposal, (proposal) => proposal.proposalOptions)
    @JoinColumn({ name: 'proposalId' })
    proposal: Proposal;

    constructor(partial: Partial<ProposalOption>) {
        Object.assign(this, partial);
    }
}
