import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalOption } from 'src/databases/entities/proposal-option.entity';
import { Proposal } from 'src/databases/entities/proposal.entity';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';

@Module({
    imports: [TypeOrmModule.forFeature([Proposal, ProposalOption])],
    controllers: [ProposalsController],
    providers: [ProposalsService],
})
export class ProposalsModule {}
