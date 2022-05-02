import { getEsConnectionUri } from '@config/get-es-connection-uri';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { crmUsersIndexName } from './crm-users-index-name';
import { CrmUsersIndexerService } from './crm-users-indexer.service';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    node: getEsConnectionUri(
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
