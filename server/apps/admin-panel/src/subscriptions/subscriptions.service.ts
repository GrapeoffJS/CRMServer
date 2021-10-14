import { CreateSubscriptionDTO } from './DTO/CreateSubscriptionDTO';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Subscription } from './models/Subscription.model';
import { UpdateSubscriptionDTO } from './DTO/UpdateSubscriptionDTO';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectModel(Subscription)
        private readonly SubscriptionModel: ReturnModelType<typeof Subscription>
    ) {
    }

    public async create(
        createSubscriptionDTO: CreateSubscriptionDTO
    ): Promise<Subscription> {
        return await this.SubscriptionModel.create(createSubscriptionDTO);
    }

    public async findAll(): Promise<Subscription[]> {
        return this.SubscriptionModel.find();
    }

    public async findById(id: string): Promise<Subscription> {
        return this.SubscriptionModel.findById(id);
    }

    public async edit(
        id: string,
        updateSubscriptionDTO: UpdateSubscriptionDTO
    ): Promise<Subscription> {
        await this.SubscriptionModel.updateOne(
            { _id: id },
            updateSubscriptionDTO
        );

        return this.SubscriptionModel.findById(id);
    }

    public async delete(id: string): Promise<Subscription> {
        return this.SubscriptionModel.findByIdAndDelete(id);
    }
}
