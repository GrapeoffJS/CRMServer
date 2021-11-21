import { Group } from '../../../../crmserver/src/crm/groups/models/Group.model';
import { GroupsHistoryItem } from './GroupsHistoryItem';
import { post, prop } from '@typegoose/typegoose';
import { Role } from '../../roles/models/Role.model';
import { AccountTypes } from './AccountTypes';
import { ActionPermissions } from '../../roles/models/ActionPermissions';
import { DataPermissions } from '../../roles/models/DataPermissions';
import { SearchIndexer } from '../../../../crmserver/src/SearchIndexer/SearchIndexer';
import { WorkHours } from '../../work-hours/models/WorkHours';

const Indexer = SearchIndexer.getInstance();

@post<CRMUser>('save', user => {
    Indexer.indexCRMUser(user);
})
@post<CRMUser>('findOneAndDelete', user => {
    Indexer.deleteCRMUser(user);
})
@post<CRMUser>('findOneAndUpdate', user => {
    Indexer.updateCRMUser(user);
})
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
    localDataPermissions: DataPermissions;

    @prop({
        type: () => [Group],
        ref: () => Group,
        required: false,
        default: []
    })
    groups: string[];

    @prop({ type: () => Array, id: false, required: false, default: [] })
    groupsHistory: GroupsHistoryItem[];

    @prop({ type: Object, required: false, default: null })
    workHours: WorkHours;

    @prop({ type: String, required: false, default: null })
    subject: string;

    public deleteGroup(id: string): void {
        this.groups.splice(this.groups.indexOf(id), 1);
    }

    public updateGroupsList(groupId: string) {
        this.groups = [...new Set(this.groups).add(groupId)];
    }

    public addGroupToHistory(groupName: string, date: string) {
        this.groupsHistory.push({ group_name: groupName, additionDate: date });
    }
}
