import { createSubscriptionDTO } from './DTO/createSubscriptionDTO';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Subscription } from './models/Subscription.model';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectModel(Subscription)
        private readonly SubscriptionModel: ReturnModelType<typeof Subscription>
    ) {}

    async create(
        createSubscriptionDTO: createSubscriptionDTO
    ): Promise<Subscription> {
        return await this.SubscriptionModel.create(createSubscriptionDTO);
    }

    async findAll(): Promise<Subscription[]> {
        return await this.SubscriptionModel.find();
    }

    async findById(id: string): Promise<Subscription> {
        return await this.SubscriptionModel.findById(id);
    }

    async edit(
        id: string,
        createSubscriptionDTO: createSubscriptionDTO
    ): Promise<Subscription> {
        await this.SubscriptionModel.updateOne(
            { _id: id },
            createSubscriptionDTO
        );
        return await this.SubscriptionModel.findById(id);
    }

    async delete(id: string): Promise<Subscription> {
        return await this.SubscriptionModel.findByIdAndDelete(id);
    }
}
