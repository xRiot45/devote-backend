import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { VoteResult } from './dto/vote-result.dto';
import { VotingResultsService } from './voting-results.service';

@Controller('voting-results')
export class VotingResultsController {
    constructor(private readonly votingResultsService: VotingResultsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    public async findAll(): Promise<ApiResponse<Proposal[]>> {
        return await this.votingResultsService.findAll();
    }

    @Get('/:proposalId')
    @UseGuards(JwtAuthGuard)
    public async resultVoteByProposal(
        @Param('proposalId', ParseIntPipe) proposalId: number,
    ): Promise<ApiResponse<VoteResult[]>> {
        return await this.votingResultsService.resultVoteByProposal(proposalId);
    }
}
