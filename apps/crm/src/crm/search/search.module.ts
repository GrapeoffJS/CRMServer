import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import getESConnectionUri from '../../config/getESConnectionUri';
import { SearchService } from './services/search/search.service';
import { SearchController } from './controllers/search.controller';
import { IndexerService } from './services/indexer/indexer.service';

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
                    )
                };
            }
        })
    ],
    providers: [SearchService, IndexerService],
    controllers: [SearchController]
})
export class SearchModule {}
