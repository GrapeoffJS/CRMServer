import { modelOptions, prop } from '@typegoose/typegoose';
import { StudentModel } from '../../../../crm/src/crm/students/models/Student.model';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class SalesFunnelStepModel {
    @prop({ type: () => String, required: true })
    name: string;

    @prop({ type: () => Number, required: true })
    order: number;

    @prop({
        type: () => [StudentModel],
        ref: () => StudentModel,
        localField: '_id',
        foreignField: 'salesFunnelStep',
        default: [],
        select: false
    })
    students: StudentModel[];

    @prop({ type: () => String, required: true, maxlength: 7 })
    background: string;

    @prop({ type: () => String, default: '#000000', maxlength: 7 })
    color: string;
}
