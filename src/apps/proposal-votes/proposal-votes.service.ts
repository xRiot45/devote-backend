import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalOption } from 'src/databases/entities/proposal-option.entity';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { DataSource, Repository } from 'typeorm';
import { LogVoteDto } from './dto/proposal-votes.dto';

@Injectable()
export class ProposalVotesService {
    constructor(
        @InjectRepository(ProposalVotes)
        private readonly proposalVotesRepository: Repository<ProposalVotes>,
        private readonly dataSource: DataSource,
    ) {}

    public async logVoteFromSmartContract(request: LogVoteDto): Promise<ApiResponse<ProposalVotes>> {
        const existing = await this.proposalVotesRepository.findOne({
            where: {
                proposal: { id: request.proposalId },
                voterAddress: request.voterAddress,
            },
        });

        if (existing) {
            throw new ConflictException('User has already voted for this proposal');
        }

        try {
            const vote = this.proposalVotesRepository.create({
                voterAddress: request.voterAddress,
                txHash: request.txHash,
                proposal: { id: request.proposalId } as Proposal,
                option: { id: request.optionId } as ProposalOption,
                votedAt: new Date(request.votedAt * 1000),
            });

            const savedVote = await this.proposalVotesRepository.save(vote);

            return {
                success: true,
                message: 'Vote logged successfully',
                data: savedVote,
            };
        } catch (error) {
            throw new InternalServerErrorException('Gagal menyimpan proposal vote', error);
        }
    }

    public async hasUserVote(proposalId: number, voterAddress: string): Promise<ApiResponse<{ hasVoted: boolean }>> {
        const existingVote = await this.proposalVotesRepository.findOne({
            where: {
                proposal: { id: proposalId },
                voterAddress: voterAddress.toLowerCase(),
            },
        });

        return {
            success: true,
            message: 'Vote result fetched successfully',
            data: {
                hasVoted: !!existingVote,
            },
        };
    }
}
