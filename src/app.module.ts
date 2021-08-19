import configModuleOptions from './config/configModuleOptions';
import getMongoConnectionUri from './config/getMongoConnectionUri';
import mongoConnectionOptions from './config/mongoConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrmaccountsModule } from './admin-panel/crmaccounts/crmaccounts.module';
import { CrmModule } from './crm/crm.module';
import { Module } from '@nestjs/common';
import { SearchModule } from './crm/search/search.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthCheckModule } from './auth-check/auth-check.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
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
        CrmModule,
        SearchModule,
        AuthenticationModule,
        AuthCheckModule,
        AdminPanelModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
