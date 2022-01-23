import { CreateSubscriptionDTO } from './DTO/CreateSubscriptionDTO';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { SubscriptionStatus } from './models/Subscription.model';
import { UpdateSubscriptionDTO } from './DTO/UpdateSubscriptionDTO';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectModel(SubscriptionStatus)
        private readonly SubscriptionModel: ReturnModelType<
            typeof SubscriptionStatus
        >
    ) {}

    async create(
        createSubscriptionDTO: CreateSubscriptionDTO
    ): Promise<SubscriptionStatus> {
        return await this.SubscriptionModel.create(createSubscriptionDTO);
    }

    async get(): Promise<SubscriptionStatus[]> {
        return this.SubscriptionModel.find();
    }

    async getByID(id: string): Promise<SubscriptionStatus> {
        return this.SubscriptionModel.findById(id);
    }

    async update(
        id: string,
        updateSubscriptionDTO: UpdateSubscriptionDTO
    ): Promise<SubscriptionStatus> {
        await this.SubscriptionModel.updateOne(
            { _id: id },
            updateSubscriptionDTO
        );

        return this.SubscriptionModel.findById(id);
    }

    async delete(id: string): Promise<SubscriptionStatus> {
        return this.SubscriptionModel.findByIdAndDelete(id);
    }
}
