import { prop } from '@typegoose/typegoose';

export class Schedule {
    @prop({ type: Boolean, required: false })
    paid: boolean;

    @prop({ type: String })
    date: string;

    @prop({ type: () => [String] })
    duration: string[];

    @prop({ type: Number, required: false, default: 2 })
    status: number;

    @prop({ type: String })
    message: string;

    @prop({ type: String, required: false })
    start: string;

    @prop({ type: String, required: false })
    finish: string;
}
