import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { Repository } from 'typeorm';
import { LogVoteDto } from './dto/proposal-votes.dto';

@Injectable()
export class ProposalVotesService {
    constructor(
        @InjectRepository(ProposalVotes)
        private readonly proposalVotesRepository: Repository<ProposalVotes>,
    ) {}

    public async logVoteFromSmartContract(request: LogVoteDto): Promise<ApiResponse<ProposalVotes>> {
        const existing = await this.proposalVotesRepository.findOne({
            where: {
                proposal: { id: request.proposalId },
                option: { id: request.optionId },
                voterAddress: request.voterAddress,
            },
        });

        if (existing) {
            throw new ConflictException('User has already voted for this proposal');
        }

        const vote = this.proposalVotesRepository.create(request);
        const savedVote = await this.proposalVotesRepository.save(vote);

        return {
            success: true,
            message: 'Vote logged successfully',
            data: savedVote,
        };
    }
}
