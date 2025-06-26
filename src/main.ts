import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
    const app = await NestFactory.create(MainModule, {
        cors: true,
    });

    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
