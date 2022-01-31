import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { Genders } from '../types/Genders';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DataRights } from '../../../../../../admin-panel/src/roles/rights/DataRights';
import { BaseModel } from '../../../../../../../utils/models/Base.model';
import { StatusModel } from '../../../statuses/models/Status.model';
import { NoteModel } from '../../notes/models/Note.model';
import { GroupModel } from '../../../groups/models/Group.model';
import { SalesFunnelStepModel } from '../../../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';
import { TutorModel } from '../../../../../../admin-panel/src/crmusers/models/Tutor.model';

@plugin(mongooseAutoPopulate)
@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Students'
    }
})
export class StudentModel extends BaseModel {
    @ApiProperty()
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_NAME] })
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_SURNAME] })
    @prop({ type: () => String, required: true })
    surname: string;

    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_MIDDLE_NAME] })
    @ApiProperty()
    @prop({ type: () => String, required: true })
    middleName: string;

    @ApiProperty({ enum: () => Genders })
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_GENDER] })
    @prop({ enum: Genders, default: Genders.NOT_DEFINED })
    gender: string;

    @ApiProperty({ type: () => Date })
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_DATE_OF_BIRTH] })
    @prop({ type: () => Date, default: null })
    dateOfBirth: Date;

    @ApiProperty()
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_PHONE] })
    @prop({ type: () => String, default: '' })
    phone: string;

    @ApiProperty()
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_PARENT_PHONE] })
    @prop({ type: () => String, default: '' })
    parentPhone: string;

    @ApiProperty()
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_PARENT_FULL_NAME] })
    @prop({ type: () => String, default: '' })
    parentFullName: string;

    @ApiProperty()
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_BALANCE] })
    @prop({ type: () => Number, default: 0 })
    balance: number;

    @ApiProperty()
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_DISCORD] })
    @prop({ type: () => String, default: '' })
    discord: string;

    @ApiProperty({ type: () => SalesFunnelStepModel })
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_SALES_FUNNEL_STEP] })
    @prop({
        type: () => SalesFunnelStepModel,
        ref: () => SalesFunnelStepModel,
        required: true,
        autopopulate: { maxDepth: 1 },
        justOne: true
    })
    salesFunnelStep: Ref<SalesFunnelStepModel>;

    @ApiProperty({ type: () => StatusModel, isArray: true })
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_STATUSES] })
    @prop({
        type: () => [StatusModel],
        ref: () => StatusModel,
        autopopulate: true
    })
    statuses: Ref<StatusModel>[];

    @ApiProperty({ type: () => NoteModel, isArray: true })
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_NOTES] })
    @prop({
        type: () => [NoteModel],
        ref: () => NoteModel,
        localField: '_id',
        foreignField: 'owner_id',
        autopopulate: true
    })
    notes: Ref<NoteModel>[];

    @ApiProperty({ type: () => GroupModel, isArray: true })
    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_GROUPS] })
    @prop({
        type: () => [GroupModel],
        ref: () => GroupModel,
        localField: '_id',
        foreignField: 'students',
        autopopulate: { maxDepth: 1 }
    })
    groups: Ref<GroupModel>[];

    @Expose({ groups: [DataRights.CAN_SEE_STUDENT_TUTORS] })
    tutors: Ref<TutorModel>[];
}
