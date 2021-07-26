import { Module } from '@nestjs/common';
import { SearchIndexerService } from './search-indexer.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import getESConnectionUri from 'src/config/getESConnectionUri';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    node:
                        configService.get('ELASTIC_SEARCH_URI') ||
                        getESConnectionUri()
                };
            }
        })
    ],
    providers: [SearchIndexerService],
    exports: [SearchIndexerService]
})
export class SearchIndexerModule {}
