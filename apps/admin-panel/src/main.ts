import { NestFactory } from '@nestjs/core';
import { AdminPanelModule } from './admin-panel.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AdminPanelModule);

    app.use(helmet());
    app.use(compression());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            always: true,
            forbidUnknownValues: true
        })
    );

    app.setGlobalPrefix('/api');
    app.enableVersioning({
        defaultVersion: '1',
        prefix: 'v',
        type: VersioningType.URI
    });

    const configService = app.get<ConfigService>(ConfigService);

    app.enableCors({
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        optionsSuccessStatus: 200,
        origin: configService.get<string>('ALLOWED_ORIGINS').split(' ')
    });

    if (configService.get<string>('GENERATE_DOCS') === 'true') {
        const config = new DocumentBuilder()
            .setTitle('AdminPanel API')
            .setDescription('AdminPanel API Documentation')
            .setVersion('1')
            .build();

        const apiDocument = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, apiDocument);
    }

    await app.listen(configService.get('ADMIN_PANEL_PORT') || process.env.PORT);
}

bootstrap().then();
