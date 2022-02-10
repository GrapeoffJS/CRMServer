import { Module } from '@nestjs/common';
import { CrmUsersModule } from './crmusers/crmusers.module';
import { SalesFunnelModule } from './sales-funnel/sales-funnel.module';
import { WorkHoursModule } from './work-hours/work-hours.module';
import { RolesModule } from './roles/roles.module';
import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import getMongoConnectionUri from '../../../config/getMongoConnectionUri';

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
        CrmUsersModule,
        SalesFunnelModule,
        WorkHoursModule,
        RolesModule,
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    limit: configService.get('THROTTLE_LIMIT'),
                    ttl: configService.get('THROTTLE_TTL')
                };
            }
        })
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
