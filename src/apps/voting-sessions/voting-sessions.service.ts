import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { StatusEnum } from 'src/enums/status.enum';
import { In, Repository } from 'typeorm';

@Injectable()
export class VotingSessionsService {
    constructor(
        @InjectRepository(Proposal)
        private readonly proposalRepository: Repository<Proposal>,
    ) {}

    public async findAll(): Promise<ApiResponse<Proposal[]>> {
        const votingSession = await this.proposalRepository.find({
            where: { status: In([StatusEnum.ACTIVE]) },
            relations: ['proposalOptions'],
            order: { createdAt: 'DESC' },
        });

        return {
            success: true,
            message: 'Voting Sessions fetched successfully',
            data: votingSession,
        };
    }
}
