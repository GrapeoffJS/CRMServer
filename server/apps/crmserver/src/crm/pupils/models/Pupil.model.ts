import { Genders } from './Genders';
import { Group } from '../../groups/models/Group.model';
import { GroupsHistoryItem } from './GroupsHistoryItem';
import { Note } from './Note.model';
import { Payment } from './Payment.model';
import { modelOptions, post, prop } from '@typegoose/typegoose';
import { Schedule } from '../../groups/models/Schedule';
import { Schema } from 'mongoose';
import { SearchIndexer } from '../../../SearchIndexer/SearchIndexer';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Tutor } from './Tutor';
import { SalesFunnelStep } from '../../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';
import Status from '../../statuses/models/Status.model';

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
@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
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

    @prop({ type: Date })
    dateOfBirth: string;

    @prop({ type: [String] })
    phone: string[];

    @prop({ type: [String] })
    parentPhone: string[];

    @prop({ type: String })
    parentFullname: string;

    @prop({ type: Number, default: 0 })
    balance: number;

    @prop({ type: String })
    discord: string;

    @prop({
        type: () => Array,
        ref: () => Group
    })
    groups: string[];

    @prop({
        type: Schema.Types.Mixed,
        default: new Map()
    })
    localSchedule: Map<string, Schedule[]>;

    @prop({
        ref: () => Payment,
        localField: '_id',
        foreignField: 'owner_id'
    })
    paymentHistory: Payment[];

    @prop({
        ref: () => Note,
        localField: '_id',
        foreignField: 'owner_id'
    })
    notes: Note[];

    @prop({
        type: () => Array,
        _id: false,

        default: []
    })
    groupsHistory: GroupsHistoryItem[];

    @prop({
        type: [Tutor],

        default: [],
        _id: false
    })
    tutors: Tutor[];

    @prop({
        type: Schema.Types.ObjectId,
        required: true,
        ref: () => SalesFunnelStep
    })
    salesFunnelStep: string;

    @prop({ type: [Status], ref: () => Status })
    statuses: Status[];

    public deleteGroup(id: string): void {
        this.groups.splice(this.groups.indexOf(id), 1);
    }

    public addGroupToHistory(groupName: string, date: string) {
        this.groupsHistory.push({
            group_name: groupName,
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
