import { prop } from '@typegoose/typegoose';

export class GroupHistoryItem {
    @prop({ type: String, required: true })
    GROUP_NAME: string;

    @prop({ type: String, required: true })
    additionDate: string;
}
