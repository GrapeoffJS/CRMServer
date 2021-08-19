import { Genders } from './Genders';
import { Group } from '../../groups/models/Group.model';
import { GroupsHistoryItem } from './GroupsHistoryItem';
import { Note } from './Note';
import { Payment } from './Payment';
import { post, prop } from '@typegoose/typegoose';
import { Schedule } from '../../groups/models/Schedule';
import { Schema } from 'mongoose';
import { SearchIndexer } from '../../../SearchIndexer/SearchIndexer';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Tutor } from './Tutor';

const Indexer = SearchIndexer.getInstance();

@post<Pupil>('save', pupil => {
    Indexer.indexPupil(pupil);
})
@post<Pupil>('findOneAndUpdate', pupil => {
    Indexer.updatePupil(pupil);
})
@post<Pupil>('findOneAndDelete', pupil => {
    Indexer.deletePupil(pupil);
})
export default class Pupil extends TimeStamps {
    @prop({ type: String, required: true })
    name: string;

    @prop({ type: String, required: true })
    surname: string;

    @prop({ type: String, required: true })
    midname: string;

    @prop({ enum: Genders, type: String, required: true })
    gender: string;

    @prop({ type: Date, required: false })
    age: string;

    @prop({ type: String, required: false, select: false })
    phone: string;

    @prop({ type: String, required: false, select: false })
    parentPhone: string;

    @prop({ type: String, required: false, select: false })
    parentNSM: string;

    @prop({ type: Number, required: false, default: 0, select: false })
    balance: number;

    @prop({ type: String, required: false, select: false })
    discord: string;

    @prop({
        type: () => Array,
        ref: () => Group,
        required: false
    })
    groups: string[];

    @prop({
        type: Schema.Types.Mixed,
        required: false,
        default: new Map(),
        select: false
    })
    localSchedule: Map<string, Schedule[]>;

    @prop({ type: () => [Payment], required: false, _id: false, select: false })
    paymentHistory: Payment[];

    @prop({ type: () => [Note], required: false, _id: false, select: false })
    notes: Note[];

    @prop({ type: () => Array, _id: false, required: false, default: [] })
    groupsHistory: GroupsHistoryItem[];

    @prop({
        type: [Tutor],
        required: false,
        default: [],
        _id: false,
        select: false
    })
    tutors: Tutor[];

    public deleteGroup(id: string): void {
        this.groups.splice(this.groups.indexOf(id), 1);
    }

    public addGroupToHistory(groupName: string, date: string) {
        this.groupsHistory.push({
            GROUP_NAME: groupName,
            additionDate: date
        });
    }

    public setGroupSchedule(groupId: string, schedule: Schedule[]) {
        this.localSchedule.set(groupId, schedule);
    }

    public addTutor(tutorId: string, groupId: string) {
        if (this.tutors.findIndex(tutor => tutor.group === groupId) === -1) {
            this.tutors.push({
                group: groupId,
                tutor: tutorId
            });
        }
    }

    public deleteTutor(groupId: string) {
        const index = this.tutors.findIndex(tutor => tutor.group === groupId);

        if (index !== -1) {
            this.tutors.splice(index, 1);
        }
    }

    public updateGroupsList(groupId: string) {
        this.groups = [...new Set(this.groups).add(groupId)];
    }
}
