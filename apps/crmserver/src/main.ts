import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SearchIndexer } from './SearchIndexer/SearchIndexer';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, '../', process.env.NODE_ENV + '.env') });

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        exposedHeaders: 'Count',
        origin: '*'
    });
    app.use(helmet());
    app.use(compression());
    app.useGlobalPipes(new ValidationPipe());

    SearchIndexer.getInstance().connect({
        node: process.env.ELASTIC_SEARCH_URI
    });

    await app.listen(process.env.CRM_PORT || 4200);
}
bootstrap();
