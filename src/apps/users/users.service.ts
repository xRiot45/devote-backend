import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponse } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async findAll(): Promise<ApiResponse<UserResponse[]>> {
        const users = await this.userRepository.find({
            order: {
                createdAt: 'DESC',
            },
        });
        return {
            success: true,
            message: 'Users fetched successfully',
            data: users,
        };
    }

    public async getMe(user: User) {
        return {
            success: true,
            message: 'User found successfully',
            data: user,
        };
    }
}
