import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { SubscriptionStatus } from '../../../../admin-panel/src/subscriptions/models/Subscription.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: SubscriptionStatus,
                schemaOptions: { collection: 'Subscriptions' }
            }
        ])
    ],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService]
})
export class SubscriptionsModule {}
