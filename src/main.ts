import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { join } from 'path';
import { MainModule } from './main.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(MainModule, {
        cors: true,
    });

    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });

    const config = new DocumentBuilder()
        .setTitle('DeVote Off-Chain API')
        .setDescription(
            'DeVote is a modern voting application based on Web3 technology designed to provide a transparent, secure, and non-manipulable voting system by utilizing smart contracts, blockchain, and hybrid architecture (on-chain + off-chain).',
        )
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/api/documentation/swagger', app, document);

    app.use(
        '/api/documentation/scalar',
        apiReference({
            content: document,
        }),
    );

    await app.listen(process.env.APP_PORT ?? 3001);
}
bootstrap();
