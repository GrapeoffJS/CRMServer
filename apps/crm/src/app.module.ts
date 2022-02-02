import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';
import getMongoConnectionUri from './config/getMongoConnectionUri';
import { AdminPanelModule } from '../../admin-panel/src/admin-panel.module';
import { CrmModule } from './crm/crm.module';
import { HealthCheckModule } from './health-check/health-check.module';
import Joi from 'joi';
import { Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

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
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('JWT_SECRET'),
                    verifyOptions: {
                        algorithm: 'HS512',
                        issuer: configService.get('JWT_ISSUER')
                    }
                };
            }
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
                        auth: {
                            username: configService.get(
                                'MONGO_INITDB_ROOT_USERNAME'
                            ),
                            password: configService.get(
                                'MONGO_INITDB_ROOT_PASSWORD'
                            )
                        },
                        authSource: 'admin',
                        useUnifiedTopology: true,
                        useNewUrlParser: true
                    } as TypegooseConnectionOptions)
                };
            }
        }),
        AdminPanelModule,
        CrmModule,
        HealthCheckModule,
        Reflector
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
