import { Module } from '@nestjs/common';
import { SubscriptionModel } from './models/Subscription.model';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: SubscriptionModel,
                schemaOptions: { collection: 'Subscriptions' }
            }
        ])
    ],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService],
    exports: [SubscriptionsService]
})
export class SubscriptionsModule {}
