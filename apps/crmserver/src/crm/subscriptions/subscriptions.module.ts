import { Module } from '@nestjs/common';
import { SubscriptionsModule as SubscriptionsServiceProvider } from '../../../../admin-panel/src/subscriptions/subscriptions.module';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';

@Module({
    imports: [SubscriptionsServiceProvider],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService]
})
export class SubscriptionsModule {}
