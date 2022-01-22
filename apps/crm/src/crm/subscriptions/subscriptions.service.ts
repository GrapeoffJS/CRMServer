import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SubscriptionStatus } from '../../../../admin-panel/src/subscriptions/models/Subscription.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectModel(SubscriptionStatus)
        private readonly SubscriptionModel: ReturnModelType<
            typeof SubscriptionStatus
        >
    ) {}

    async findAll() {
        return this.SubscriptionModel.find();
    }

    async findById(id: string) {
        return this.SubscriptionModel.findById(id);
    }
}
