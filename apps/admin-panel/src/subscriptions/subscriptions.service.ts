import { CreateSubscriptionDTO } from './DTO/CreateSubscriptionDTO';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Subscription } from './models/Subscription.model';
import { UpdateSubscriptionDTO } from './DTO/UpdateSubscriptionDTO';
import { AccountTypes } from '../crmaccounts/models/AccountTypes';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectModel(Subscription)
        private readonly SubscriptionModel: ReturnModelType<typeof Subscription>
    ) {}

    public async create(
        createSubscriptionDTO: CreateSubscriptionDTO
    ): Promise<Subscription> {
        return await this.SubscriptionModel.create(createSubscriptionDTO);
    }

    public async findAll(): Promise<Subscription[]> {
        return this.SubscriptionModel.find();
    }

    public async findById(
        id: string,
        accountType?: AccountTypes
    ): Promise<Subscription> {
        if (!accountType) return this.SubscriptionModel.findById(id);
        return this.SubscriptionModel.findOne({ _id: id, accountType });
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
