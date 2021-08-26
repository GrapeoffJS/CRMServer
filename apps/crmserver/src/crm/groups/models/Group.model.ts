import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
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
    GROUP_NAME: string;

    @prop({ type: Number, required: true })
    PLACES: number;

    @prop({ type: Number, required: true })
    LEVEL: number;

    @prop({
        type: String,
        ref: () => CRMUser,
        required: false,
        default: null
    })
    TUTOR: string | null;

    @prop({
        type: Array,
        ref: () => Pupil,
        required: false,
        default: []
    })
    PUPILS: string[];

    @prop({
        type: () => [Schedule],
        required: false,
        _id: false
    })
    GLOBAL_SCHEDULE: Schedule[];

    public deletePupil(id: string): void {
        this.PUPILS.splice(this.PUPILS.indexOf(id), 1);
    }

    public addPupils(ids: string[]): void {
        this.PUPILS = [...new Set<string>(this.PUPILS.concat(ids))];
    }
}
