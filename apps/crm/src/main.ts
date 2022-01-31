import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { JwtService } from '@nestjs/jwt';
import { ActionRightsGuard } from './authorization/action-rights-guard.service';
import { RightsBasedSerializerInterceptor } from './authorization/rights-based-serializer.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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

    const reflector = app.get<Reflector>(Reflector);
    const jwtService = app.get<JwtService>(JwtService);

    app.useGlobalGuards(
        new AuthorizationGuard(reflector, jwtService),
        new ActionRightsGuard(reflector, jwtService)
    );

    app.useGlobalInterceptors(
        new RightsBasedSerializerInterceptor(reflector, jwtService)
    );

    app.setGlobalPrefix('/api');
    app.enableVersioning({
        defaultVersion: '1',
        prefix: 'v',
        type: VersioningType.URI
    });

    const config = new DocumentBuilder()
        .setTitle('CRM API')
        .setDescription('CRM API Documentation')
        .setVersion('1')
        .addBearerAuth()
        .build();

    const apiDocument = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, apiDocument);

    await app.listen(app.get<ConfigService>(ConfigService).get('PORT'));
}

bootstrap().then(r => r);
