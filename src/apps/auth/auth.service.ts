import { ConflictException, Injectable } from '@nestjs/common';
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

    public async authWithWalletAddress(createUserDto: AuthDto): Promise<ApiResponse<User>> {
        const existingUser = await this.userRepository.findOneBy({
            walletAddress: createUserDto.walletAddress,
        });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const user = this.userRepository.create({
            walletAddress: createUserDto.walletAddress,
            name: createUserDto.name,
            email: createUserDto.email,
        });

        await this.userRepository.save(user);

        return {
            success: true,
            message: 'User created successfully',
            data: user,
        };
    }
}
