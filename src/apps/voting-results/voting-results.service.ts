import { Injectable } from '@nestjs/common';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { DataSource } from 'typeorm';
import { VoteResult } from './dto/vote-result.dto';

@Injectable()
export class VotingResultsService {
    constructor(private readonly dataSource: DataSource) {}

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
