import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProposalVotesModule } from './proposal-votes/proposal-votes.module';
import { ProposalsModule } from './proposals/proposals.module';
import { UsersModule } from './users/users.module';
import { VotingSessionsModule } from './voting-sessions/voting-sessions.module';

@Module({
    imports: [UsersModule, AuthModule, ProposalsModule, VotingSessionsModule, ProposalVotesModule],
    controllers: [],
    providers: [],
})
export default class AppModule {}
