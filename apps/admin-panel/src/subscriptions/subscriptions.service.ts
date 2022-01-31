import { CreateSubscriptionDto } from './dto/CreateSubscriptionDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { SubscriptionModel } from './models/Subscription.model';
import { UpdateSubscriptionDto } from './dto/UpdateSubscriptionDto';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectModel(SubscriptionModel)
        private readonly subscriptionModel: ReturnModelType<
            typeof SubscriptionModel
        >
    ) {}

    async create(createSubscriptionDto: CreateSubscriptionDto) {
        return await this.subscriptionModel.create(createSubscriptionDto);
    }

    async get() {
        return this.subscriptionModel.find().exec();
    }

    async getByID(id: string) {
        return this.subscriptionModel.findById(id).exec();
    }

    async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
        await this.subscriptionModel
            .updateOne({ _id: id }, updateSubscriptionDto)
            .exec();

        return this.subscriptionModel.findById(id).exec();
    }

    async delete(id: string) {
        return this.subscriptionModel.findByIdAndDelete(id).exec();
    }
}
