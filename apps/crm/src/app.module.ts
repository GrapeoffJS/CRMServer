import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import getMongoConnectionUri from './config/getMongoConnectionUri';
import { AdminPanelModule } from '../../admin-panel/src/admin-panel.module';
import { ConnectionOptions } from 'mongoose';
import { CrmModule } from './crm/crm.module';
import { HealthCheckModule } from './health-check/health-check.module';
import Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            envFilePath: '.env',
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().min(0).max(65535).default(4200),
                MONGO_CONNECTION_PROTOCOL: Joi.string().required(),
                MONGO_HOST: Joi.string().required(),
                MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
                MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
                MONGO_DEFAULTDB: Joi.string().required(),
                MONGO_CONNECTION_PARAMS: Joi.string().required(),
                ELASTIC_SEARCH_PROTOCOL: Joi.string().required(),
                ELASTIC_SEARCH_USERNAME: Joi.string().required(),
                ELASTIC_SEARCH_PASSWORD: Joi.string().required(),
                ELASTIC_SEARCH_HOST: Joi.string().required(),
                ELASTIC_SEARCH_PORT: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_REFRESH_SECRET: Joi.string().required(),
                JWT_LIFETIME: Joi.string().required(),
                JWT_REFRESH_LIFETIME: Joi.string().required()
            })
        }),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            async useFactory(configService: ConfigService) {
                return {
                    uri: getMongoConnectionUri(
                        configService.get('MONGO_CONNECTION_PROTOCOL'),
                        configService.get('MONGO_HOST'),
                        configService.get('MONGO_PORT'),
                        configService.get('MONGO_DEFAULTDB'),
                        configService.get('MONGO_CONNECTION_PARAMS')
                    ),
                    ...({
                        useCreateIndex: true,
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false,
                        auth: {
                            user: configService.get(
                                'MONGO_INITDB_ROOT_USERNAME'
                            ),
                            password: configService.get(
                                'MONGO_INITDB_ROOT_PASSWORD'
                            )
                        },
                        authSource: 'admin'
                    } as ConnectionOptions)
                };
            }
        }),
        AdminPanelModule,
        CrmModule,
        HealthCheckModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
