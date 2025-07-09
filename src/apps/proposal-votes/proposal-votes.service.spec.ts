import { Test, TestingModule } from '@nestjs/testing';
import { ProposalVotesService } from './proposal-votes.service';

describe('ProposalVotesService', () => {
    let service: ProposalVotesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProposalVotesService],
        }).compile();

        service = module.get<ProposalVotesService>(ProposalVotesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
