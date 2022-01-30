import { Controller, Get } from '@nestjs/common';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator
} from '@nestjs/terminus';
import { TypegooseHealthIndicatorService } from './indicators/typegoose-health-indicator/typegoose-health-indicator.service';
import { ElasticSearchHealthIndicatorService } from './indicators/elastic-search-health-indicator/elastic-search-health-indicator.service';
import { ApiTags } from '@nestjs/swagger';
import { PublicController } from '../authorization/PublicController';

@ApiTags('Health Check')
@PublicController()
@Controller('/health-check')
export class HealthCheckController {
    constructor(
        private health: HealthCheckService,
        private typegooseHealthIndicator: TypegooseHealthIndicatorService,
        private elasticSearchHealthIndicator: ElasticSearchHealthIndicatorService,
        private memoryHealthIndicator: MemoryHealthIndicator,
        private diskHealthIndicator: DiskHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.typegooseHealthIndicator.isHealthy('Database'),
            () => this.elasticSearchHealthIndicator.isHealthy('ElasticSearch'),
            () =>
                this.memoryHealthIndicator.checkHeap(
                    'Memory heap',
                    300 * 1024 * 1024
                ),
            () =>
                this.memoryHealthIndicator.checkRSS(
                    'Memory RSS',
                    300 * 1024 * 1024
                ),
            () =>
                this.diskHealthIndicator.checkStorage('Disk health', {
                    thresholdPercent: 0.5,
                    path:
                        process.platform === 'linux' ||
                        process.platform === 'darwin'
                            ? '/'
                            : 'C:'
                })
        ]);
    }
}
