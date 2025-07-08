import { Test, TestingModule } from '@nestjs/testing';
import { VotingSessionsController } from './voting-sessions.controller';
import { VotingSessionsService } from './voting-sessions.service';

describe('VotingSessionsController', () => {
    let controller: VotingSessionsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VotingSessionsController],
            providers: [VotingSessionsService],
        }).compile();

        controller = module.get<VotingSessionsController>(VotingSessionsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
