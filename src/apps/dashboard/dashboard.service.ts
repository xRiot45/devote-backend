import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalOption } from 'src/databases/entities/proposal-option.entity';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import { DashboardSummaryDto } from './dto/dashboard.dto';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Proposal)
        private readonly proposalRepository: Repository<Proposal>,

        @InjectRepository(ProposalVotes)
        private readonly votesRepository: Repository<ProposalVotes>,

        @InjectRepository(ProposalOption)
        private readonly optionRepository: Repository<ProposalOption>,
    ) {}

    async getSummary(): Promise<ApiResponse<DashboardSummaryDto>> {
        const [totalUsers, totalProposals, totalVotes, totalProposalOptions] = await Promise.all([
            this.userRepository.count(),
            this.proposalRepository.count(),
            this.votesRepository.count(),
            this.optionRepository.count(),
        ]);

        return {
            success: true,
            message: 'Dashboard summary fetched successfully',
            data: {
                totalUsers,
                totalProposals,
                totalVotes,
                totalProposalOptions,
            },
        };
    }
}
