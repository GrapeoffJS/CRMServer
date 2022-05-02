import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ActionRightsGuard } from './authorization/action-rights-guard.service';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { RightsBasedSerializerInterceptor } from './authorization/rights-based-serializer.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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

    const reflector = app.get<Reflector>(Reflector);
    const jwtService = app.get<JwtService>(JwtService);
    const configService = app.get<ConfigService>(ConfigService);

    app.enableCors({
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: configService.get<string>('ALLOWED_HEADERS').split(' '),
        optionsSuccessStatus: 200,
        origin: configService.get<string>('ALLOWED_ORIGINS').split(' ')
    });

    app.useGlobalGuards(
        new AuthorizationGuard(reflector, jwtService),
        new ActionRightsGuard(reflector)
    );

    app.useGlobalInterceptors(new RightsBasedSerializerInterceptor(reflector));

    app.setGlobalPrefix('/api');
    app.enableVersioning({
        defaultVersion: '1',
        prefix: 'v',
        type: VersioningType.URI
    });

    if (configService.get<string>('GENERATE_DOCS') === 'true') {
        const config = new DocumentBuilder()
            .setTitle('CRM API')
            .setDescription('CRM API Documentation')
            .setVersion('1')
            .addBearerAuth()
            .build();

        const apiDocument = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, apiDocument);
    }

    await app.listen(
        app.get<ConfigService>(ConfigService).get('CRM_PORT') ||
            process.env.PORT
    );
}

bootstrap().then(r => r);
