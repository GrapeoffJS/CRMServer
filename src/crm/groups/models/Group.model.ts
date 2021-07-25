import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import Pupil from '../../pupils/models/Pupil.model';
import { index, prop } from '@typegoose/typegoose';
import { Schedule } from './Schedule';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@index({ GROUP_NAME: 'text' }, { weights: { GROUP_NAME: 1 } })
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
        default: ''
    })
    TUTOR: string;

    @prop({ type: Array, ref: () => Pupil, required: false, default: [] })
    PUPILS: string[];

    @prop({ type: () => [Schedule], required: false, _id: false })
    GLOBAL_SCHEDULE: Schedule[];

    /**
     * Delete Pupil from this group by Pupil's id
     * @param {string} id - Pupil id
     */
    public deletePupil(id: string): void {
        this.PUPILS.splice(this.PUPILS.indexOf(id), 1);
    }

    /**
     * Add pupils to this group
     * @param ids Pupils' ids
     */
    public addPupils(ids: string[]): void {
        this.PUPILS = [...new Set<string>(this.PUPILS.concat(ids))];
    }
}
