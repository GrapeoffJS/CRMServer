import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    node: configService.get('ELASTIC_SEARCH_URI')
                };
            }
        }),
        ConfigModule
    ],
    controllers: [SearchController],
    providers: [SearchService]
})
export class SearchModule {}
