import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/databases/entities/user.entity';
import type { JwtPayload } from 'src/types/auth';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
            throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userRepository.findOneBy({
            id: payload.sub,
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
