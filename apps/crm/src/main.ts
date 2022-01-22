import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.use(helmet());
    app.use(compression());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    );

    await app.listen(process.env.PORT || 4200);
}

bootstrap().then(r => r);
