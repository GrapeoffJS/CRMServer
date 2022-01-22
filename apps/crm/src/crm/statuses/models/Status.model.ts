import { prop } from '@typegoose/typegoose';

export default class StatusModel {
    @prop({ type: () => String, required: true })
    name: string;

    @prop({ type: () => String, required: true })
    color: string;
}
