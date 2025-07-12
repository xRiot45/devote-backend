import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProposalOption } from './proposal-option.entity';
import { Proposal } from './proposal.entity';

@Entity('proposal_votes')
export class ProposalVotes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Proposal, (proposal) => proposal.votes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'proposalId' })
    proposal: Proposal;

    @ManyToOne(() => ProposalOption, (option) => option.votes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'optionId' })
    option: ProposalOption;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    voterAddress: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    txHash: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    votedAt: Date;
}
