import { Controller, Get, UseGuards } from '@nestjs/common';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { VotingSessionsService } from './voting-sessions.service';

@Controller('voting-sessions')
export class VotingSessionsController {
    constructor(private readonly votingSessionsService: VotingSessionsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    public async findAll(): Promise<ApiResponse<Proposal[]>> {
        return await this.votingSessionsService.findAll();
    }
}
