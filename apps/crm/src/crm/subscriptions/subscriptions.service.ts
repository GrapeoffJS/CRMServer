import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Subscription } from '../../../../admin-panel/src/subscriptions/models/Subscription.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectModel(Subscription)
        private readonly SubscriptionModel: ReturnModelType<typeof Subscription>
    ) {}

    async findAll() {
        return this.SubscriptionModel.find();
    }

    async findById(id: string) {
        return this.SubscriptionModel.findById(id);
    }
}
