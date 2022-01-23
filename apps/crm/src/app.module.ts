import configModuleOptions from './config/configModuleOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import getMongoConnectionUri from './config/getMongoConnectionUri';
import { AdminPanelModule } from '../../admin-panel/src/admin-panel.module';
import { ConnectionOptions } from 'mongoose';
import { CrmModule } from './crm/crm.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
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
