import { getEsConnectionUri } from '@config/get-es-connection-uri';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearcherController } from './searcher.controller';
import { SearcherService } from './searcher.service';

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
    providers: [SearcherService],
    controllers: [SearcherController]
})
export class SearcherModule {}
