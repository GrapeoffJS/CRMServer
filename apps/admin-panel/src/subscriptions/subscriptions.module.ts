import { Module } from '@nestjs/common';
import { Subscription } from './models/Subscription.model';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Subscription,
                schemaOptions: { collection: 'Subscriptions' }
            }
        ])
    ],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService]
})
export class SubscriptionsModule {}