import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppModule from './apps/app.module';
import { DatabaseModule } from './databases/database.module';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AppModule,
        DatabaseModule,
    ],
    controllers: [],
    providers: [],
})
export class MainModule {}
