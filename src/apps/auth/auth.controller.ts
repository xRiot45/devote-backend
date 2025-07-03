import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthWithWalletDto, AuthWithWalletResponse, CheckWalletResponse } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/wallet')
    public async authWithWalletAddress(
        @Body() body: AuthWithWalletDto,
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

    @Get('/wallet/check')
    public async checkWalletAddress(
        @Query('walletAddress') walletAddress: string,
    ): Promise<ApiResponse<CheckWalletResponse>> {
        return await this.authService.checkWalletAddress(walletAddress);
    }
}
