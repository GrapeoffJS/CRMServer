import { prop } from '@typegoose/typegoose';

export class TaskTag {
    @prop({ type: String, required: true })
    name: string;

    @prop({ type: String, required: true })
    color: string;
}
