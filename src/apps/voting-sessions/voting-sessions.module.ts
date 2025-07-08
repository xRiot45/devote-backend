import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { VotingSessionsController } from './voting-sessions.controller';
import { VotingSessionsService } from './voting-sessions.service';

@Module({
    imports: [TypeOrmModule.forFeature([Proposal])],
    controllers: [VotingSessionsController],
    providers: [VotingSessionsService],
})
export class VotingSessionsModule {}
