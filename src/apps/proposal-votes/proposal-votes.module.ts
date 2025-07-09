import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { ProposalVotesController } from './proposal-votes.controller';
import { ProposalVotesService } from './proposal-votes.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProposalVotes])],
    controllers: [ProposalVotesController],
    providers: [ProposalVotesService],
})
export class ProposalVotesModule {}
