import { CreateSubscriptionDTO } from './DTO/CreateSubscriptionDTO';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { SubscriptionModel } from './models/Subscription.model';
import { UpdateSubscriptionDTO } from './DTO/UpdateSubscriptionDTO';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectModel(SubscriptionModel)
        private readonly subscriptionModel: ReturnModelType<
            typeof SubscriptionModel
        >
    ) {}

    async create(createSubscriptionDTO: CreateSubscriptionDTO) {
        return await this.subscriptionModel.create(createSubscriptionDTO);
    }

    async get() {
        return this.subscriptionModel.find();
    }

    async getByID(id: string) {
        return this.subscriptionModel.findById(id);
    }

    async update(id: string, updateSubscriptionDTO: UpdateSubscriptionDTO) {
        await this.subscriptionModel.updateOne(
            { _id: id },
            updateSubscriptionDTO
        );

        return this.subscriptionModel.findById(id);
    }

    async delete(id: string) {
        return this.subscriptionModel.findByIdAndDelete(id);
    }
}
