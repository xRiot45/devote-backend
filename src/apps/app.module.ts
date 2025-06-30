import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProposalsModule } from './proposals/proposals.module';

@Module({
    imports: [UsersModule, AuthModule, ProposalsModule],
    controllers: [],
    providers: [],
})
export default class AppModule {}
