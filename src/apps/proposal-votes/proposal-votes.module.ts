import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { VotingListenerService } from './listeners/voting-listener.service';
import { ProposalVotesController } from './proposal-votes.controller';
import { ProposalVotesService } from './proposal-votes.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProposalVotes])],
    controllers: [ProposalVotesController],
    providers: [ProposalVotesService, VotingListenerService],
})
export class ProposalVotesModule {}
