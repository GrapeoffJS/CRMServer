import configModuleOptions from './config/configModuleOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrmModule } from './crm/crm.module';
import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthCheckModule } from './auth-check/auth-check.module';
import { TypegooseModule } from 'nestjs-typegoose';
import getMongoConnectionUri from './config/getMongoConnectionUri';
import mongoConnectionOptions from './config/mongoConnectionOptions';
import { AdminPanelModule } from '../../admin-panel/src/admin-panel.module';

@Module({
    imports: [
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            async useFactory(configService: ConfigService) {
                return {
                    uri:
                        getMongoConnectionUri(
                            configService.get('MONGO_HOST'),
                            configService.get('MONGO_PORT'),
                            configService.get('MONGO_DEFAULTDB')
                        ) || configService.get('DB_CONNECTION_URI'),
                    ...mongoConnectionOptions
                };
            }
        }),
        AdminPanelModule,
        ConfigModule.forRoot(configModuleOptions),
        CrmModule,
        AuthenticationModule,
        AuthCheckModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
