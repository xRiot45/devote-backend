import { Test, TestingModule } from '@nestjs/testing';
import { VotingSessionsService } from './voting-sessions.service';

describe('VotingSessionsService', () => {
    let service: VotingSessionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VotingSessionsService],
        }).compile();

        service = module.get<VotingSessionsService>(VotingSessionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
