import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../databases/entities/user.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let repo: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        repo = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should create new user if wallet not exists', async () => {
        jest.spyOn(repo, 'findOneBy').mockReturnValue(null);
        jest.spyOn(repo, 'save').mockImplementation(async (user) => user as User);

        const result = await service.authWithWalletAddress({
            walletAddress: '0xbda5747bfd65f08deb54cb465eb87d40e51b197e',
            email: 'thomasalberto456@gmail.com',
            name: 'Thomas Alberto',
        });

        expect(result.walletAddress).toBe('0xbda5747bfd65f08deb54cb465eb87d40e51b197e');
    });
});
