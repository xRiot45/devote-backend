import { Controller } from '@nestjs/common';
import { VotingResultsService } from './voting-results.service';

@Controller('voting-results')
export class VotingResultsController {
    constructor(private readonly votingResultsService: VotingResultsService) {}
}
