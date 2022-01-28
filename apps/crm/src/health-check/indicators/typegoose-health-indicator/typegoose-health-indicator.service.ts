import { Inject, Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus';
import { getConnectionToken } from 'nestjs-typegoose';
import { mongoose } from '@typegoose/typegoose';

@Injectable()
export class TypegooseHealthIndicatorService extends HealthIndicator {
    constructor(
        @Inject(getConnectionToken()) private connection: mongoose.Connection
    ) {
        super();
    }

    async isHealthy(key: string) {
        const isHealthy = this.connection.readyState === 1;
        const result = this.getStatus(key, isHealthy, {
            connectionState: this.connection.readyState
        });

        if (!isHealthy) {
            throw new HealthCheckError(
                'There are problems with database connection',
                result
            );
        }

        return result;
    }
}
