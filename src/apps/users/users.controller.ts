import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/databases/entities/user.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    public async getUser(@CurrentUser() user: User) {
        return await this.usersService.getUser(user);
    }
}
