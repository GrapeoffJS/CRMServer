import { Genders } from './Genders';
import { Group } from '../../groups/models/Group.model';
import { GroupsHistoryItem } from './GroupsHistoryItem';
import { index, prop } from '@typegoose/typegoose';
import { Note } from './Note';
import { Payment } from './Payment';
import { Schedule } from '../../groups/models/Schedule';
import { Schema } from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Tutor } from './Tutor';

@index(
    {
        name: 'text',
        surname: 'text',
        midname: 'text',
        parentNSM: 'text',
        parentPhone: 'text',
        phone: 'text'
    },
    {
        weights: {
            name: 3,
            surname: 3,
            midname: 3,
            parentNSM: 4,
            parentPhone: 2,
            phone: 1
        }
    }
)
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

    @prop({ type: String, required: false })
    phone: string;

    @prop({ type: String, required: false })
    parentPhone: string;

    @prop({ type: String, required: false })
    parentNSM: string;

    @prop({ type: Number, required: false, default: 0 })
    balance: number;

    @prop({ type: String, required: false })
    discord: string;

    @prop({
        type: () => Array,
        ref: () => Group,
        required: false
    })
    groups: string[];

    @prop({ type: Schema.Types.Mixed, required: false, default: new Map() })
    localSchedule: Map<string, Schedule[]>;

    @prop({ type: () => [Payment], required: false, _id: false })
    paymentHistory: Payment[];

    @prop({ type: () => [Note], required: false, _id: false })
    notes: Note[];

    @prop({ type: () => Array, _id: false, required: false, default: [] })
    groupsHistory: GroupsHistoryItem[];

    @prop({ type: [Tutor], required: false, default: [], _id: false })
    tutors: Tutor[];

    @prop({ type: Number, required: false, default: 0 })
    private totalVisitsCount: number;

    /**
     * Delete group from Pupil by Group id
     * @param {string} id - Group id
     */
    public deleteGroup(id: string): void {
        this.groups.splice(this.groups.indexOf(id), 1);
    }

    /**
     * Adds group to group history
     * @param {string} groupName - Group name
     */
    public addGroupToHistory(groupName: string, date: string) {
        this.groupsHistory.push({
            GROUP_NAME: groupName,
            additionDate: date,
            visitsCount: 0
        });
    }

    /**
     * Set GLOBAL_SCHEDULE for pupils
     * @param {string} groupId - Group id
     * @param {DocumentType<Pupil>[]} pupils - Array of Pupils
     */
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

    public addVisits(count: number) {
        this.totalVisitsCount += count;
    }
}
