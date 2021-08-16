import { Group } from '../../crm/groups/models/Group.model';
import { GroupsHistoryItem } from './GroupsHistoryItem';
import { prop, modelOptions } from '@typegoose/typegoose';
import { Roles } from './Roles';

export default class CRMUser {
    @prop({ type: String, required: true })
    name: string;

    @prop({ type: String, required: true })
    surname: string;

    @prop({ type: String, required: true })
    midname: string;

    @prop({ type: String, unique: true, required: true })
    login: string;

    @prop({ type: String, select: false, required: true })
    password: string;

    @prop({ type: String, enum: Roles, required: true })
    role: string;

    @prop({
        type: () => Array,
        ref: () => Group,
        required: false,
        default: []
    })
    groups: string[];

    @prop({ type: () => Array, id: false, required: false, default: [] })
    groupsHistory: GroupsHistoryItem[];

    public deleteGroup(id: string): void {
        this.groups.splice(this.groups.indexOf(id), 1);
    }

    public updateGroupsList(groupId: string) {
        this.groups = [...new Set(this.groups).add(groupId)];
    }

    public addGroupToHistory(groupName: string, date: string) {
        this.groupsHistory.push({ GROUP_NAME: groupName, additionDate: date });
    }
}
