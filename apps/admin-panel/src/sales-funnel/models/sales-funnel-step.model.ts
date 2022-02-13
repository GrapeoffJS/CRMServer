import { modelOptions, prop } from '@typegoose/typegoose';
import { StudentModel } from '../../../../crm/src/crm/students/crud/models/student.model';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '../../../../../utils/models/base.model';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class SalesFunnelStepModel extends BaseModel {
    @ApiProperty()
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @prop({ type: () => Number, required: true })
    order: number;

    @ApiProperty({ type: () => StudentModel, isArray: true })
    @prop({
        type: () => [StudentModel],
        ref: () => StudentModel,
        localField: '_id',
        foreignField: 'salesFunnelStep',
        default: [],
        select: false
    })
    students: StudentModel[];

    @ApiProperty()
    @prop({ type: () => String, required: true, maxlength: 7 })
    background: string;

    @ApiProperty()
    @prop({ type: () => String, default: '#000000', maxlength: 7 })
    color: string;
}
