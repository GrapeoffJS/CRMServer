import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SearchIndexer } from './SearchIndexer/SearchIndexer';
import { config } from 'dotenv';
import path from 'path';
import getESConnectionUri from './config/getESConnectionUri';

config({ path: path.join(__dirname, '../../', process.env.NODE_ENV + '.env') });

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        exposedHeaders: 'Count',
        origin: '*'
    });
    app.use(helmet());
    app.use(compression());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    );

    SearchIndexer.getInstance().connect({
        node: getESConnectionUri()
    });

    await app.listen(process.env.PORT || 4200);
}

bootstrap();
