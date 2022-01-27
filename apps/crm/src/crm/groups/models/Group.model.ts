import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { StudentModel } from '../../students/models/Student.model';
import { TutorModel } from '../../../../../admin-panel/src/crmusers/models/Tutor.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';

@plugin(mongooseAutoPopulate)
@modelOptions({
    schemaOptions: {
        collection: 'Groups',
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class GroupModel {
    @prop({ type: () => String, required: true })
    name: string;

    @prop({ type: () => Number, required: true, min: 0 })
    level: number;

    @prop({ type: () => Number, required: true, min: 0 })
    places: number;

    @prop({ type: () => Boolean, default: false })
    trial: boolean;

    @prop({
        type: () => [StudentModel],
        ref: () => StudentModel,
        autopopulate: { maxDepth: 1 }
    })
    students: Ref<StudentModel, string>[];

    @prop({ type: () => TutorModel, ref: () => TutorModel, autopopulate: true })
    tutor: Ref<TutorModel>;
}
