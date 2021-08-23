import { prop } from '@typegoose/typegoose';

export class GroupsHistoryItem {
    @prop({ type: String, required: true })
    GROUP_NAME: string;

    @prop({ type: String, required: true })
    additionDate: string;

    @prop({ type: Number, default: 0 })
    visitsCount?: number;
}
