import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string) {
        const user = await this.authService.validateUser(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
