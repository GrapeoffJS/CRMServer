import { modelOptions, prop } from '@typegoose/typegoose';
import Pupil from '../../../../crmserver/src/crm/pupils/models/Pupil.model';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class SalesFunnelStep {
    @prop({ type: String, required: true })
    name: string;

    @prop({ type: Number, required: true })
    order: number;

    @prop({
        type: [Pupil],
        required: false,
        default: [],
        ref: () => Pupil,
        localField: '_id',
        foreignField: 'salesFunnelStep'
    })
    pupils: Pupil[];

    @prop({ type: String, required: true, maxlength: 7 })
    background: string;

    @prop({ type: String, default: '#000000', maxlength: 7 })
    color: string;
}
