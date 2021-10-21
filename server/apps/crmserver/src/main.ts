import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SearchIndexer } from './SearchIndexer/SearchIndexer';
import getESConnectionUri from './config/getESConnectionUri';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService>(ConfigService);
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
        node: getESConnectionUri(
            configService.get('ELASTIC_SEARCH_PROTOCOL'),
            configService.get('ELASTIC_SEARCH_HOST'),
            configService.get('ELASTIC_SEARCH_PORT')
        ),
        auth: {
            username: configService.get('ELASTIC_SEARCH_USERNAME'),
            password: configService.get('ELASTIC_SEARCH_PASSWORD')
        }
    });

    await app.listen(process.env.PORT || 4200);
}

bootstrap();
