import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
    MongooseHealthIndicator
} from '@nestjs/terminus';
import { getConnectionToken } from 'nestjs-typegoose';

@Controller('/health-check')
export class HealthCheckController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private mongoose: MongooseHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.http.pingCheck('API', 'http://localhost:4200/api/v1/'),
            () =>
                this.mongoose.pingCheck('MongoDB', {
                    connection: getConnectionToken(),
                    timeout: 1500
                })
        ]);
    }
}
