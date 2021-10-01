import { prop } from '@typegoose/typegoose';

export default class Status {
    @prop({ type: String, required: true })
    name: string;

    @prop({ type: String, required: true })
    color: string;
}
