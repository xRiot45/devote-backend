import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, AuthWithWalletResponse } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/wallet')
    public async authWithWalletAddress(
        @Body() body: AuthDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<ApiResponse<AuthWithWalletResponse>> {
        const { data, message } = await this.authService.authWithWalletAddress(body);
        const { refreshToken } = data as { accessToken: string; refreshToken: string; isNewUser: boolean };

        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.APP_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
            success: true,
            message,
            data,
        };
    }
}
