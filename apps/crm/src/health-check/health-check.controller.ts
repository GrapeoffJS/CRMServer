import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator
} from '@nestjs/terminus';
import { Public } from '../authorization/public.decorator';
import { ElasticSearchHealthIndicatorService } from './indicators/elastic-search-health-indicator/elastic-search-health-indicator.service';
import { TypegooseHealthIndicatorService } from './indicators/typegoose-health-indicator/typegoose-health-indicator.service';

@ApiTags('Health Check')
@Public()
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
