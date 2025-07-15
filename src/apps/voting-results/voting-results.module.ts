import { Module } from '@nestjs/common';
import { VotingResultsController } from './voting-results.controller';
import { VotingResultsService } from './voting-results.service';

@Module({
    controllers: [VotingResultsController],
    providers: [VotingResultsService],
})
export class VotingResultsModule {}
