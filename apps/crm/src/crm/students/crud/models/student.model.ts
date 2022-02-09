import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Genders } from '../types/genders';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { DataRights } from '../../../../../../admin-panel/src/roles/rights/data-rights';
import { BaseModel } from '../../../../../../../utils/models/base.model';
import { StatusModel } from '../../../statuses/models/status.model';
import { NoteModel } from '../../notes/models/note.model';
import { GroupModel } from '../../../groups/crud/models/group.model';
import { SalesFunnelStepModel } from '../../../../../../admin-panel/src/sales-funnel/models/sales-funnel-step.model';
import { TutorModel } from '../../../../../../admin-panel/src/crmusers/models/tutor.model';
import { DateTime } from 'luxon';
import { PhoneNumber } from '../dto/create-student.dto';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { TaskModel } from '../../../tasks/crud/models/task.model';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Students'
    }
})
export class StudentModel extends BaseModel {
    @ApiProperty()
    @Expose({ groups: [DataRights.SEE_STUDENT_NAME] })
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @Expose({ groups: [DataRights.SEE_STUDENT_SURNAME] })
    @prop({ type: () => String, required: true })
    surname: string;

    @Expose({ groups: [DataRights.SEE_STUDENT_MIDDLE_NAME] })
    @ApiProperty()
    @prop({ type: () => String, required: true })
    middleName: string;

    @ApiProperty({ enum: () => Genders })
    @Expose({ groups: [DataRights.SEE_STUDENT_GENDER] })
    @prop({ enum: Genders, default: Genders.NOT_DEFINED })
    gender: string;

    @ApiProperty({ type: () => Date })
    @Transform(prop =>
        DateTime.fromJSDate(prop.value)
            .setLocale('ru')
            .setZone('Europe/Moscow')
            .toFormat('DDD')
    )
    @Expose({ groups: [DataRights.SEE_STUDENT_DATE_OF_BIRTH] })
    @prop({ type: () => Date, default: null })
    dateOfBirth: Date;

    @ApiProperty()
    @Transform(prop =>
        Math.floor(
            DateTime.now().diff(
                DateTime.fromJSDate(prop.obj.dateOfBirth),
                'years'
            ).years
        )
    )
    @Expose({ groups: [DataRights.SEE_STUDENT_DATE_OF_BIRTH] })
    age: number;

    @ApiProperty()
    @Transform(prop =>
        parsePhoneNumberFromString(
            String(prop?.value?.phone),
            prop?.value?.countryCode
        )?.formatInternational()
    )
    @Expose({ groups: [DataRights.SEE_STUDENT_PHONE] })
    @prop({ type: () => Object, _id: false })
    phone: PhoneNumber;

    @ApiProperty()
    @Transform(prop =>
        parsePhoneNumberFromString(
            String(prop?.value?.phone),
            prop?.value?.countryCode
        )?.formatInternational()
    )
    @Expose({ groups: [DataRights.SEE_STUDENT_PARENT_PHONE] })
    @prop({ type: () => Object, _id: false })
    parentPhone: PhoneNumber;

    @ApiProperty()
    @Expose({ groups: [DataRights.SEE_STUDENT_PARENT_FULL_NAME] })
    @prop({ type: () => String, default: '' })
    parentFullName: string;

    @ApiProperty()
    @Expose({ groups: [DataRights.SEE_STUDENT_BALANCE] })
    @prop({ type: () => Number, default: 0 })
    balance: number;

    @ApiProperty()
    @Expose({ groups: [DataRights.SEE_STUDENT_DISCORD] })
    @prop({ type: () => String, default: '' })
    discord: string;

    @ApiProperty({ type: () => SalesFunnelStepModel })
    @Type(() => SalesFunnelStepModel)
    @Expose({ groups: [DataRights.SEE_STUDENT_SALES_FUNNEL_STEP] })
    @prop({
        ref: () => SalesFunnelStepModel,
        required: true,
        justOne: true
    })
    salesFunnelStep: Ref<SalesFunnelStepModel>;

    @ApiProperty({ type: () => StatusModel, isArray: true })
    @Type(() => StatusModel)
    @Expose({ groups: [DataRights.SEE_STUDENT_STATUSES] })
    @prop({
        ref: () => StatusModel
    })
    statuses: Ref<StatusModel>[];

    @ApiProperty({ type: () => NoteModel, isArray: true })
    @Type(() => NoteModel)
    @Expose({ groups: [DataRights.SEE_STUDENT_NOTES] })
    @prop({
        ref: () => NoteModel,
        localField: '_id',
        foreignField: 'owner_id'
    })
    notes: Ref<NoteModel>[];

    @ApiProperty({ type: () => GroupModel, isArray: true })
    @Type(() => GroupModel)
    @Expose({ groups: [DataRights.SEE_STUDENT_GROUPS] })
    @prop({
        ref: () => GroupModel,
        localField: '_id',
        foreignField: 'students'
    })
    groups: Ref<GroupModel>[];

    @Type(() => TaskModel)
    @Expose({ groups: [DataRights.SEE_STUDENT_TASKS] })
    @prop({
        ref: () => TaskModel,
        localField: '_id',
        foreignField: 'for'
    })
    tasks: Ref<TaskModel>;

    @Type(() => TutorModel)
    @Expose({ groups: [DataRights.SEE_STUDENT_TUTORS] })
    tutors: Ref<TutorModel>[];
}
