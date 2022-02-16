import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrmUsersIndexerService } from './crm-users-indexer.service';
import getESConnectionUri from '../../../../config/getESConnectionUri';
import { crmUsersIndexName } from './crm-users-index-name';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    node: getESConnectionUri(
                        configService.get('ELASTIC_SEARCH_PROTOCOL'),
                        configService.get('ELASTIC_SEARCH_HOST'),
                        configService.get('ELASTIC_SEARCH_PORT')
                    ),
                    auth: {
                        username: configService.get('ELASTIC_SEARCH_USERNAME'),
                        password: configService.get('ELASTIC_SEARCH_PASSWORD')
                    }
                };
            }
        })
    ],
    providers: [
        { provide: 'CRM_USERS_INDEX_NAME', useValue: crmUsersIndexName },
        CrmUsersIndexerService
    ]
})
export class CrmUsersIndexerModule {}
