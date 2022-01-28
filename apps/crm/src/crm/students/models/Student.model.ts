import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { Genders } from '../types/Genders';
import { StatusModel } from '../statuses/models/Status.model';
import { SalesFunnelStepModel } from '../../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { NoteModel } from '../notes/models/Note.model';
import { GroupModel } from '../../groups/models/Group.model';
import { ApiProperty } from '@nestjs/swagger';

@plugin(mongooseAutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Students'
    }
})
export class StudentModel extends TimeStamps {
    @ApiProperty()
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @prop({ type: () => String, required: true })
    surname: string;

    @ApiProperty()
    @prop({ type: () => String, required: true })
    middleName: string;

    @ApiProperty({ enum: () => Genders })
    @prop({ enum: Genders, required: true })
    gender: string;

    @ApiProperty({ type: () => Date })
    @prop({ type: () => Date, required: true })
    dateOfBirth: Date;

    @ApiProperty()
    @prop({ type: () => String })
    phone: string;

    @ApiProperty()
    @prop({ type: () => String, required: true })
    parentPhone: string;

    @ApiProperty()
    @prop({ type: () => String, required: true })
    parentFullName: string;

    @ApiProperty()
    @prop({ type: () => Number, default: 0 })
    balance: number;

    @ApiProperty()
    @prop({ type: () => String })
    discord: string;

    @ApiProperty({ type: () => SalesFunnelStepModel })
    @prop({
        type: () => SalesFunnelStepModel,
        ref: () => SalesFunnelStepModel,
        required: true,
        autopopulate: { maxDepth: 1 }
    })
    salesFunnelStep: Ref<SalesFunnelStepModel>;

    @ApiProperty({ type: () => StatusModel, isArray: true })
    @prop({
        type: () => [StatusModel],
        ref: () => StatusModel,
        autopopulate: true
    })
    statuses: Ref<StatusModel>[];

    @ApiProperty({ type: () => NoteModel, isArray: true })
    @prop({
        type: () => [NoteModel],
        ref: () => NoteModel,
        localField: '_id',
        foreignField: 'owner_id',
        autopopulate: true
    })
    notes: Ref<NoteModel>[];

    @ApiProperty({ type: () => GroupModel, isArray: true })
    @prop({
        type: () => [GroupModel],
        ref: () => GroupModel,
        localField: '_id',
        foreignField: 'students',
        autopopulate: { maxDepth: 1 }
    })
    groups: Ref<GroupModel>[];
}
