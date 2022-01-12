import { prop } from '@typegoose/typegoose';

export class Schedule {
    @prop({ type: Boolean })
    paid: boolean;

    @prop({ type: String })
    date: string;

    @prop({ type: () => [String] })
    duration: string[];

    @prop({ type: Number, default: 2 })
    status: number;

    @prop({ type: String })
    message: string;

    @prop({ type: String })
    start: string;

    @prop({ type: String })
    finish: string;
}
