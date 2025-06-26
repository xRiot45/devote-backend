import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../databases/entities/user.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async authWithWalletAddress(authDto: AuthDto): Promise<User> {
        const existingUser = await this.userRepository.findOneBy({
            walletAddress: authDto.walletAddress,
        });

        if (!existingUser) {
            return await this.userRepository.save({
                walletAddress: authDto.walletAddress,
                email: authDto.email ?? '',
                name: authDto.name ?? '',
            });
        }

        return existingUser;
    }
}
