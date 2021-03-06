import { getMongoConnectionUri } from '@config/get-mongo-connection-uri';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import Joi from 'joi';
import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';

import { CrmUsersIndexerModule } from './crm-users-indexer/crm-users-indexer.module';
import { CrmUsersModule } from './crmusers/crmusers.module';
import { RolesModule } from './roles/roles.module';
import { SalesFunnelModule } from './sales-funnel/sales-funnel.module';
import { WorkHoursModule } from './work-hours/work-hours.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            envFilePath: '.env',
            isGlobal: true,
            validationSchema: Joi.object({
                ADMIN_PANEL_PORT: Joi.number().min(0).max(65535),
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
                THROTTLE_TTL: Joi.number().required(),
                THROTTLE_LIMIT: Joi.number().required()
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
        EventEmitterModule.forRoot({ delimiter: '.' }),
        CrmUsersModule,
        SalesFunnelModule,
        WorkHoursModule,
        RolesModule,
        CrmUsersIndexerModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AdminPanelModule {}
