import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { StatusEnum } from 'src/enums/status.enum';
import { DataSource, In, Repository } from 'typeorm';
import { VoteResult } from './dto/vote-result.dto';

@Injectable()
export class VotingResultsService {
    constructor(
        @InjectRepository(Proposal)
        private readonly proposalRepository: Repository<Proposal>,
        private readonly dataSource: DataSource,
    ) {}

    public async findAll(): Promise<ApiResponse<Proposal[]>> {
        const votingSession = await this.proposalRepository.find({
            where: { status: In([StatusEnum.ENDED, StatusEnum.ENDED]) },
            relations: ['proposalOptions'],
            order: { createdAt: 'DESC' },
        });

        return {
            success: true,
            message: 'Voting Result fetched successfully',
            data: votingSession,
        };
    }

    public async resultVoteByProposal(proposalId: number): Promise<ApiResponse<VoteResult[]>> {
        const rawResults = await this.dataSource
            .getRepository(ProposalVotes)
            .createQueryBuilder('vote')
            .select('vote.optionId', 'optionId')
            .addSelect('COUNT(*)', 'totalVotes')
            .where('vote.proposalId = :proposalId', { proposalId })
            .groupBy('vote.optionId')
            .getRawMany();

        const results: VoteResult[] = rawResults.map((row) => ({
            optionId: Number(row.optionId),
            totalVotes: Number(row.totalVotes),
        }));

        return {
            success: true,
            message: 'Vote result fetched successfully',
            data: results,
        };
    }
}
