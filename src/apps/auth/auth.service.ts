import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../databases/entities/user.entity';
import { AuthDto, AuthWithWalletResponse } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    public async authWithWalletAddress(authDto: AuthDto): Promise<ApiResponse<AuthWithWalletResponse>> {
        const existingUser = await this.userRepository.findOneBy({
            walletAddress: authDto.walletAddress,
        });

        let user = existingUser;
        const isNewUser = !existingUser;

        if (isNewUser) {
            if (!authDto.name || !authDto.email) {
                throw new BadRequestException('Name and email are required for new users');
            }

            await this.userRepository.save({
                walletAddress: authDto.walletAddress,
                name: authDto.name,
                email: authDto.email,
            });

            user = await this.userRepository.findOneBy({
                walletAddress: authDto.walletAddress,
            });
        }

        const payload = {
            id: user!.id,
            walletAddress: user!.walletAddress,
            role: user!.role,
        };

        const accessToken = this.jwtService.sign(
            { ...payload, tokenType: 'access' },
            { secret: process.env.JWT_ACCESS_TOKEN_SECRET as string },
        );

        const refreshToken = this.jwtService.sign(
            { ...payload, tokenType: 'refresh' },
            {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
                expiresIn: 7 * 24 * 60 * 60,
            },
        );

        return {
            success: true,
            message: isNewUser ? 'User created successfully' : 'User logged in successfully',
            data: {
                isNewUser,
                accessToken,
                refreshToken,
            },
        };
    }

    public async validateUser(email: string) {
        const user = await this.userRepository.findOneBy({
            email,
        });

        return { id: user.id, email: user.email, role: user.role };
    }
}
