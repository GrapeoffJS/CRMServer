import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticSearchHealthIndicatorService extends HealthIndicator {
    constructor(private readonly elasticsearchService: ElasticsearchService) {
        super();
    }

    async isHealthy(key: string) {
        try {
            await this.elasticsearchService.ping();

            return this.getStatus(key, true);
        } catch (error) {
            throw new HealthCheckError(
                'ElasticsearchHealthIndicator failed',
                this.getStatus(key, false)
            );
        }
    }
}
