import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { LogVoteDto, VoteResult } from './dto/proposal-votes.dto';
import { ProposalVotesService } from './proposal-votes.service';

@Controller('proposal-votes')
export class ProposalVotesController {
    constructor(private readonly proposalVotesService: ProposalVotesService) {}

    @Post()
    async logVoteFromSmartContract(@Body() request: LogVoteDto): Promise<ApiResponse<ProposalVotes>> {
        return await this.proposalVotesService.logVoteFromSmartContract(request);
    }

    @Get('/:proposalId')
    async resultVoteByProposal(
        @Param('proposalId', ParseIntPipe) proposalId: number,
    ): Promise<ApiResponse<VoteResult[]>> {
        return await this.proposalVotesService.resultVoteByProposal(proposalId);
    }
}
