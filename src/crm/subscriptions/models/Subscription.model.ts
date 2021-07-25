import { prop } from '@typegoose/typegoose';

export class Subscription {
    @prop({ type: String, required: true })
    name: string;

    @prop({ type: Number, required: true })
    price: number;

    @prop({ type: Number, required: true })
    hoursCount: number;
}
