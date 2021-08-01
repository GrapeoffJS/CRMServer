import { ImportFileController } from './crm/pupils/import-file.controller';
import configModuleOptions from './config/configModuleOptions';
import getMongoConnectionUri from './config/getMongoConnectionUri';
import mongoConnectionOptions from './config/mongoConnectionOptions';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrmaccountsModule } from './crmaccounts/crmaccounts.module';
import { CrmModule } from './crm/crm.module';
import { Module } from '@nestjs/common';
import { SearchModule } from './crm/search/search.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { SearchIndexerModule } from './search-indexer/search-indexer.module';
import { AuthCheckModule } from './auth-check/auth-check.module';

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
        AuthModule,
        CrmModule,
        SearchModule,
        SearchIndexerModule,
        AuthCheckModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
