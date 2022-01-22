import { Module } from '@nestjs/common';
import { SubscriptionStatus } from './models/Subscription.model';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { TypegooseModule } from 'nestjs-typegoose';

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
    providers: [SubscriptionsService],
    exports: [SubscriptionsService]
})
export class SubscriptionsModule {}
