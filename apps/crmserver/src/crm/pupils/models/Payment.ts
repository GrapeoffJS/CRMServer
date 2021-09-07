import { PaymentTypes } from './PaymentTypes';
import { prop } from '@typegoose/typegoose';
import { Subscription } from '../../../../../admin-panel/src/subscriptions/models/Subscription.model';

export class Payment {
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
