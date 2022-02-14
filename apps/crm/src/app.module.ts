import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';
import getMongoConnectionUri from '../../../config/getMongoConnectionUri';
import { CrmModule } from './crm/crm.module';
import { HealthCheckModule } from './health-check/health-check.module';
import Joi from 'joi';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TasksModule } from './crm/tasks/tasks.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            envFilePath: '.env',
            isGlobal: true,
            validationSchema: Joi.object({
                CRM_PORT: Joi.number().min(0).max(65535),
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
                JWT_REFRESH_LIFETIME: Joi.string().required(),
                THROTTLE_TTL: Joi.number().required(),
                THROTTLE_LIMIT: Joi.number().required(),
                ALLOWED_ORIGINS: Joi.string().required(),
                ALLOWED_HEADERS: Joi.string().required(),
                GENERATE_DOCS: Joi.string().equal('true', 'false').required()
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
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    limit: configService.get('THROTTLE_LIMIT'),
                    ttl: configService.get('THROTTLE_TTL')
                };
            }
        }),
        EventEmitterModule.forRoot({
            delimiter: '.'
        }),
        CrmModule,
        HealthCheckModule,
        Reflector,
        TasksModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
