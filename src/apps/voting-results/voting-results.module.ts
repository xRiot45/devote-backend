import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { VotingResultsController } from './voting-results.controller';
import { VotingResultsService } from './voting-results.service';

@Module({
    imports: [TypeOrmModule.forFeature([Proposal])],
    controllers: [VotingResultsController],
    providers: [VotingResultsService],
})
export class VotingResultsModule {}
