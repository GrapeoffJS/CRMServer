import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { StudentModel } from '../../../students/crud/models/student.model';
import { TutorModel } from '../../../../../../admin-panel/src/crmusers/models/tutor.model';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '../../../../../../../utils/models/base.model';
import { Expose, Transform, Type } from 'class-transformer';
import { DataRights } from '../../../../../../admin-panel/src/roles/rights/data-rights';

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
        type: () => [StudentModel],
        ref: () => StudentModel
    })
    students: Ref<StudentModel>[];

    @ApiProperty({ type: () => TutorModel, isArray: true })
    @Type(() => TutorModel)
    @Expose({ groups: [DataRights.SEE_GROUP_TUTOR] })
    @prop({
        type: () => TutorModel,
        ref: () => TutorModel,
        justOne: true
    })
    tutor: Ref<TutorModel>;
}
