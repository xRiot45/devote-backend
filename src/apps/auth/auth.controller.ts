import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/wallet')
    @ApiOperation({ summary: 'Authenticate with wallet address' })
    @ApiBody({ type: AuthDto })
    @SwaggerApiResponse({
        status: 200,
        description: 'Successfully authenticated and received access & refresh token.',
        schema: {
            example: {
                success: true,
                message: 'Authentication successful',
                data: {
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    refreshToken: 'd9f8s7d6f8sd7f6sdf...',
                },
            },
        },
    })
    @SwaggerApiResponse({
        status: 400,
        description: 'Invalid wallet address or request data',
    })
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
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
