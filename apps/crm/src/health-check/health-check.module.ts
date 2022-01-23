import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [TypegooseModule.forFeature([]), TerminusModule, HttpModule],
    controllers: [HealthCheckController]
})
export class HealthCheckModule {}
