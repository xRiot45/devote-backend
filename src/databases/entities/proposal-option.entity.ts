import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ProposalVotes } from './proposal-votes';
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
        nullable: true,
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

    @ManyToOne(() => Proposal, (proposal) => proposal.proposalOptions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'proposalId' })
    proposal: Proposal;

    @OneToMany(() => ProposalVotes, (vote) => vote.option, {
        onDelete: 'CASCADE',
    })
    votes: ProposalVotes[];

    constructor(partial: Partial<ProposalOption>) {
        Object.assign(this, partial);
    }
}
