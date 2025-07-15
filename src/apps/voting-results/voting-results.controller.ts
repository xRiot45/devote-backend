import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VoteResult } from './dto/vote-result.dto';
import { VotingResultsService } from './voting-results.service';

@Controller('voting-results')
export class VotingResultsController {
    constructor(private readonly votingResultsService: VotingResultsService) {}

    @Get('/:proposalId')
    public async resultVoteByProposal(
        @Param('proposalId', ParseIntPipe) proposalId: number,
    ): Promise<ApiResponse<VoteResult[]>> {
        return await this.votingResultsService.resultVoteByProposal(proposalId);
    }
}
