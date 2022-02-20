import { getEsConnectionUri } from '@config/get-es-connection-uri';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TerminusModule } from '@nestjs/terminus';
import { TypegooseModule } from 'nestjs-typegoose';

import { HealthCheckController } from './health-check.controller';
import { ElasticSearchHealthIndicatorService } from './indicators/elastic-search-health-indicator/elastic-search-health-indicator.service';
import { TypegooseHealthIndicatorService } from './indicators/typegoose-health-indicator/typegoose-health-indicator.service';

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
        }),
        TypegooseModule.forFeature([]),
        TerminusModule,
        HttpModule
    ],
    controllers: [HealthCheckController],
    providers: [
        TypegooseHealthIndicatorService,
        ElasticSearchHealthIndicatorService
    ]
})
export class HealthCheckModule {}
