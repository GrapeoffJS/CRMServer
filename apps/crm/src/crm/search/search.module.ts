import { Module } from '@nestjs/common';
import { SearchService } from './services/search/search.service';
import { SearchController } from './controllers/search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import getESConnectionUri from '../../../../../config/getESConnectionUri';

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
    providers: [SearchService],
    controllers: [SearchController]
})
export class SearchModule {}
