import { Test, TestingModule } from '@nestjs/testing';
import { ProposalVotesController } from './proposal-votes.controller';
import { ProposalVotesService } from './proposal-votes.service';

describe('ProposalVotesController', () => {
    let controller: ProposalVotesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProposalVotesController],
            providers: [ProposalVotesService],
        }).compile();

        controller = module.get<ProposalVotesController>(ProposalVotesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
