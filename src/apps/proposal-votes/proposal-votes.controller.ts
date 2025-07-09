import { Controller } from '@nestjs/common';
import { ProposalVotesService } from './proposal-votes.service';

@Controller('proposal-votes')
export class ProposalVotesController {
    constructor(private readonly proposalVotesService: ProposalVotesService) {}
}
