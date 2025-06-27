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

    public async authWithWalletAddress(authDto: AuthDto): Promise<ApiResponse<User>> {
        const user = await this.userRepository.findOneBy({ walletAddress: authDto.walletAddress });

        if (!user) {
            return {
                success: true,
                message: 'User created successfully',
                data: await this.userRepository.save({
                    walletAddress: authDto.walletAddress,
                    name: authDto.name,
                    email: authDto.email,
                }),
            };
        }

        return {
            success: true,
            message: 'User logged in successfully',
            data: user,
        };
    }
}
