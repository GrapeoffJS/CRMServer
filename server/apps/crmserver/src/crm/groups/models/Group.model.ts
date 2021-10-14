import CRMUser from '../../../../../admin-panel/src/crmaccounts/models/CRMUser.model';
import Pupil from '../../pupils/models/Pupil.model';
import { post, prop } from '@typegoose/typegoose';
import { Schedule } from './Schedule';
import { SearchIndexer } from '../../../SearchIndexer/SearchIndexer';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

const Indexer = SearchIndexer.getInstance();

@post<Group>('save', group => {
    Indexer.indexGroup(group);
})
@post<Group>('findOneAndUpdate', group => {
    Indexer.updateGroup(group);
})
@post<Group>('findOneAndDelete', group => {
    Indexer.deleteGroup(group);
})
export class Group extends TimeStamps {
    @prop({ type: String, required: true })
    group_name: string;

    @prop({ type: Number, required: true })
    places: number;

    @prop({ type: Number, required: true })
    level: number;

    @prop({
        type: String,
        ref: () => CRMUser,
        required: false,
        default: null
    })
    tutor: string | null;

    @prop({
        type: Array,
        ref: () => Pupil,
        required: false,
        default: []
    })
    pupils: string[];

    @prop({
        type: () => [Schedule],
        required: false,
        _id: false
    })
    global_schedule: Schedule[];

    public deletePupil(id: string): void {
        this.pupils.splice(this.pupils.indexOf(id), 1);
    }

    public addPupils(ids: string[]): void {
        this.pupils = [...new Set<string>(this.pupils.concat(ids))];
    }
}
