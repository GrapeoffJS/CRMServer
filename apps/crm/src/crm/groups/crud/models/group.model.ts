import { TutorModel } from '@apps/admin-panel/crmusers/models/tutor.model';
import { DataRights } from '@apps/admin-panel/roles/rights/data-rights';
import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { BaseModel } from '@utils/models/base.model';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

import { StudentModel } from '../../../students/crud/models/student.model';

@modelOptions({
    schemaOptions: {
        collection: 'Groups',
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class GroupModel extends BaseModel {
    @ApiProperty()
    @Expose({ groups: [DataRights.SEE_GROUP_NAME] })
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @Expose({ groups: [DataRights.SEE_GROUP_LEVEL] })
    @prop({ type: () => Number, required: true, min: 0 })
    level: number;

    @ApiProperty()
    @Expose({ groups: [DataRights.SEE_GROUP_PLACES] })
    @prop({ type: () => Number, required: true, min: 0 })
    places: number;

    @ApiProperty()
    @Transform(prop => prop.obj.places - prop.obj.students.length)
    @Expose({ groups: [DataRights.SEE_GROUP_PLACES] })
    freePlaces: number;

    @ApiProperty()
    @prop({ type: () => Boolean, default: false })
    trial: boolean;

    @ApiProperty({ type: () => StudentModel, isArray: true })
    @Type(() => StudentModel)
    @Expose({ groups: [DataRights.SEE_GROUP_STUDENTS] })
    @prop({
        ref: () => StudentModel
    })
    students: Ref<StudentModel>[];

    @ApiProperty({ type: () => TutorModel, isArray: true })
    @Type(() => TutorModel)
    @Expose({ groups: [DataRights.SEE_GROUP_TUTOR] })
    @prop({
        ref: () => TutorModel,
        justOne: true
    })
    tutor: Ref<TutorModel>;

    @Exclude()
    studentsCount: number;
}
