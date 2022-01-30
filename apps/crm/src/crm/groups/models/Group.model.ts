import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { StudentModel } from '../../students/models/Student.model';
import { TutorModel } from '../../../../../admin-panel/src/crmusers/models/Tutor.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { ApiProperty } from '@nestjs/swagger';

@plugin(mongooseAutoPopulate)
@modelOptions({
    schemaOptions: {
        collection: 'Groups',
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class GroupModel {
    @ApiProperty()
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @prop({ type: () => Number, required: true, min: 0 })
    level: number;

    @ApiProperty()
    @prop({ type: () => Number, required: true, min: 0 })
    places: number;

    @ApiProperty()
    @prop({ type: () => Boolean, default: false })
    trial: boolean;

    @ApiProperty({ type: () => StudentModel, isArray: true })
    @prop({
        type: () => [StudentModel],
        ref: () => StudentModel,
        autopopulate: { maxDepth: 0 }
    })
    students: Ref<StudentModel, string>[];

    @ApiProperty({ type: () => TutorModel, isArray: true })
    @prop({
        type: () => TutorModel,
        ref: () => TutorModel,
        foreignField: '_id',
        localField: 'tutor',
        autopopulate: { maxDepth: 0 },
        justOne: true
    })
    tutor: Ref<TutorModel>;
}
