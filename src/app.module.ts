import configModuleOptions from './config/configModuleOptions';
import getMongoConnectionUri from './config/getMongoConnectionUri';
import mongoConnectionOptions from './config/mongoConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrmaccountsModule } from './crmaccounts/crmaccounts.module';
import { CrmModule } from './crm/crm.module';
import { Module } from '@nestjs/common';
import { SearchModule } from './crm/search/search.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthenticationModule } from './authentication/authentication.module';

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
        CrmaccountsModule,
        CrmModule,
        SearchModule,
        AuthenticationModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
