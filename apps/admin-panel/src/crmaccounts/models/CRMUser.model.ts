import { Group } from '../../../../crmserver/src/crm/groups/models/Group.model';
import { GroupsHistoryItem } from './GroupsHistoryItem';
import { prop } from '@typegoose/typegoose';
import { Role } from 'apps/admin-panel/src/roles/models/Role.model';
import { AccountTypes } from './AccountTypes';
import { ActionPermissions } from '../../roles/models/ActionPermissions';
import { DataPermissions } from '../../roles/models/DataPermissions';

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

    @prop({ type: String, enum: AccountTypes, required: true })
    accountType: AccountTypes;

    @prop({ type: Role, ref: () => Role, required: false, default: null })
    role: Role | string | null;

    @prop({ type: Array, required: false, default: null })
    localActionPermissions: ActionPermissions[];

    @prop({ type: Array, required: false, default: null })
    localDataPermissions: DataPermissions[];

    @prop({
        type: () => [String],
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