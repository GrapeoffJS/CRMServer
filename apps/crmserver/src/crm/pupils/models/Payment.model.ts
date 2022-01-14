import { PaymentTypes } from './PaymentTypes';
import { prop } from '@typegoose/typegoose';
import { Subscription } from '../../../../../admin-panel/src/subscriptions/models/Subscription.model';
import { Schema } from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Payment extends TimeStamps {
    @prop({ type: Schema.Types.ObjectId, required: true })
    owner_id: string;

    @prop({ required: true })
    type: PaymentTypes;

    @prop({ type: String, required: true })
    date: string;

    @prop({ type: Number, required: true })
    amount: number;

    @prop({ type: String, required: true })
    issuer: string;

    @prop({
        type: Subscription,
        ref: () => Subscription,
        default: null
    })
    subscription?: string;
}
