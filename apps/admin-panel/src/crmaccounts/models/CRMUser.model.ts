import { post, prop, Ref } from '@typegoose/typegoose';
import { Role } from '../../roles/models/Role.model';
import { AccountTypes } from '../Types/AccountTypes';
import { SearchIndexer } from '../../../../crm/src/SearchIndexer/SearchIndexer';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
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
export default class CRMUser extends TimeStamps {
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

    @prop({ type: Role, ref: () => Role, required: true })
    role: Ref<Role>;

    @prop({ type: Object, default: null })
    workHours: WorkHours;
}
