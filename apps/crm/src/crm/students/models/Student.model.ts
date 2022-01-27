import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { Genders } from '../types/Genders';
import { StatusModel } from '../statuses/models/Status.model';
import { SalesFunnelStepModel } from '../../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { NoteModel } from '../notes/models/Note.model';
import { GroupModel } from '../../groups/models/Group.model';

@plugin(mongooseAutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Students'
    }
})
export class StudentModel extends TimeStamps {
    @prop({ type: () => String, required: true })
    name: string;

    @prop({ type: () => String, required: true })
    surname: string;

    @prop({ type: () => String, required: true })
    middleName: string;

    @prop({ enum: Genders, required: true })
    gender: string;

    @prop({ type: () => Date, required: true })
    dateOfBirth: Date;

    @prop({ type: () => String })
    phone: string;

    @prop({ type: () => String, required: true })
    parentPhone: string;

    @prop({ type: () => String, required: true })
    parentFullName: string;

    @prop({ type: () => Number, default: 0 })
    balance: number;

    @prop({ type: () => String })
    discord: string;

    @prop({
        type: () => SalesFunnelStepModel,
        ref: () => SalesFunnelStepModel,
        required: true,
        autopopulate: { maxDepth: 1 }
    })
    salesFunnelStep: Ref<SalesFunnelStepModel>;

    @prop({
        type: () => [StatusModel],
        ref: () => StatusModel,
        autopopulate: true
    })
    statuses: Ref<StatusModel>[];

    @prop({
        type: () => [NoteModel],
        ref: () => NoteModel,
        localField: '_id',
        foreignField: 'owner_id',
        autopopulate: true
    })
    notes: Ref<NoteModel>[];

    @prop({
        type: () => [GroupModel],
        ref: () => GroupModel,
        localField: '_id',
        foreignField: 'students',
        autopopulate: { maxDepth: 1 }
    })
    groups: Ref<GroupModel>[];
}
