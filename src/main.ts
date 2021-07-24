import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import getMongoConnectionUri from './config/getMongoConnectionUri';

const whiteList: string[] = [
    'https://trusting-khorana-b780d2.netlify.app',
    'https://cocky-ritchie-52224a.netlify.app/'
];

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        exposedHeaders: 'Count',
        origin: '*'
    });
    app.use(helmet());
    app.use(compression());

    // const SwaggerConfig = new DocumentBuilder()
    //     .setTitle('DVMN CRM API')
    //     .setDescription('DevMan CRM Server API Docs')
    //     .setVersion('1.0.0')
    //     .addBearerAuth()
    //     .build();

    // const APIDocsDocument = SwaggerModule.createDocument(app, SwaggerConfig);
    // SwaggerModule.setup('/api/docs', app, APIDocsDocument);

    await app.listen(process.env.PORT || 4200);
}
bootstrap();
