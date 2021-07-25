import { prop } from '@typegoose/typegoose';
import { PaymentTypes } from "./PaymentTypes";

export class Payment {
    @prop({ enum: PaymentTypes, required: true })
    type: PaymentTypes;

    @prop({ type: String, required: true })
    date: string;

    @prop({ type: Number, required: true })
    amount: number;

    @prop({ type: String, required: true })
    issuer: string;

    @prop({ type: String, required: false, default: '' })
    subscription?: string;
}
