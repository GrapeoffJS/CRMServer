import { Group } from '../../crm/groups/models/Group.model';
import { GroupHistoryItem } from './GroupHistoryItem';
import { prop } from '@typegoose/typegoose';
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
    groupsHistory: GroupHistoryItem[];

    /**
     * Delete Group from CRMUser by Group id
     * @param {string} id - Group id
     */
    public deleteGroup(id: string): void {
        this.groups.splice(this.groups.indexOf(id), 1);
    }

    /**
     * Adds group to groups list
     * @param {string} groupId - Group id
     */
    public updateGroupsList(groupId: string) {
        this.groups = [...new Set(this.groups).add(groupId)];
    }

    /**
     * Adds group to group history
     * @param {string} groupName - Group name
     */
    public addGroupToHistory(groupName: string, date: string) {
        this.groupsHistory.push({ GROUP_NAME: groupName, additionDate: date });
    }
}
