import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { LogVoteDto, VoteResult } from './dto/proposal-votes.dto';
import { ProposalVotesService } from './proposal-votes.service';

@Controller('proposal-votes')
export class ProposalVotesController {
    constructor(private readonly proposalVotesService: ProposalVotesService) {}

    @Post()
    public async logVoteFromSmartContract(@Body() request: LogVoteDto): Promise<ApiResponse<ProposalVotes>> {
        return await this.proposalVotesService.logVoteFromSmartContract(request);
    }

    @Get('/:proposalId/has-voted')
    public async hasUserVote(
        @Param('proposalId', ParseIntPipe) proposalId: number,
        @Query('voterAddress') voterAddress: string,
    ): Promise<ApiResponse<{ hasVoted: boolean }>> {
        return await this.proposalVotesService.hasUserVote(proposalId, voterAddress);
    }

    @Get('/:proposalId')
    public async resultVoteByProposal(
        @Param('proposalId', ParseIntPipe) proposalId: number,
    ): Promise<ApiResponse<VoteResult[]>> {
        return await this.proposalVotesService.resultVoteByProposal(proposalId);
    }
}
