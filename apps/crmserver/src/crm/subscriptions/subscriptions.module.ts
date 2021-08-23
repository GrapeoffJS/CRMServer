import { Module } from '@nestjs/common';
import { SubscriptionsModule as SubscriptionsServiceProvider } from '../../../../admin-panel/src/subscriptions/subscriptions.module';
import { SubscriptionsController } from './subscriptions.controller';

@Module({
    imports: [SubscriptionsServiceProvider],
    controllers: [SubscriptionsController]
})
export class SubscriptionsModule {}
