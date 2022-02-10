import { NestFactory } from '@nestjs/core';
import { AdminPanelModule } from './admin-panel.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AdminPanelModule);

    app.enableCors({ credentials: true });
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

    const config = new DocumentBuilder()
        .setTitle('AdminPanel API')
        .setDescription('AdminPanel API Documentation')
        .setVersion('1')
        .build();

    const apiDocument = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, apiDocument);

    const configService = app.get<ConfigService>(ConfigService);

    await app.listen(configService.get('ADMIN_PANEL_PORT') || process.env.PORT);
}

bootstrap().then();
