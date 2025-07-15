import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { VotingResultsController } from './voting-results.controller';
import { VotingResultsService } from './voting-results.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProposalVotes])],
    controllers: [VotingResultsController],
    providers: [VotingResultsService],
})
export class VotingResultsModule {}
