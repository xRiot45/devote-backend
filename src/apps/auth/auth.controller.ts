import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/wallet')
    public async authWithWalletAddress(
        @Body() authDto: AuthDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
        const { data, message } = await this.authService.authWithWalletAddress(authDto);
        const { accessToken, refreshToken } = data;
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.APP_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
            success: true,
            message,
            data: {
                accessToken,
                refreshToken,
            },
        };
    }
}
