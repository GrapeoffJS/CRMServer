import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { TypegooseHealthIndicatorService } from './indicators/typegoose-health-indicator/typegoose-health-indicator.service';
import { ElasticSearchHealthIndicatorService } from './indicators/elastic-search-health-indicator/elastic-search-health-indicator.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import getESConnectionUri from '../config/getESConnectionUri';

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
