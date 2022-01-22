import { prop } from '@typegoose/typegoose';

export class TaskTagModel {
    @prop({ type: () => String, required: true })
    name: string;

    @prop({ type: () => String, required: true })
    color: string;
}
