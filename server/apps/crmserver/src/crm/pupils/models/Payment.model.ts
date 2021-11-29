import { PaymentTypes } from './PaymentTypes';
import { prop } from '@typegoose/typegoose';
import { Subscription } from '../../../../../admin-panel/src/subscriptions/models/Subscription.model';
import { Schema } from 'mongoose';

export class Payment {
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
        required: false,
        ref: () => Subscription,
        default: null
    })
    subscription?: string;
}
