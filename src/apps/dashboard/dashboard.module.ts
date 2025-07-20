import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalOption } from 'src/databases/entities/proposal-option.entity';
import { ProposalVotes } from 'src/databases/entities/proposal-votes';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { User } from 'src/databases/entities/user.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Proposal, ProposalVotes, ProposalOption])],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {}
