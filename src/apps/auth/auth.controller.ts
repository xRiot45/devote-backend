import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/databases/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/wallet')
    public async authWithWalletAddress(@Body() authDto: AuthDto): Promise<ApiResponse<User>> {
        return await this.authService.authWithWalletAddress(authDto);
    }
}
