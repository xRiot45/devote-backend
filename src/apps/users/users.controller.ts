import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/databases/entities/user.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserResponse } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    public async findAll(): Promise<ApiResponse<UserResponse[]>> {
        return await this.usersService.findAll();
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    public async getMe(@CurrentUser() user: User) {
        return await this.usersService.getMe(user);
    }
}
