import Pupil from '../../../../crmserver/src/crm/pupils/models/Pupil.model';
import { prop } from '@typegoose/typegoose';

export class SalesFunnelStep {
    @prop({ type: String, required: true })
    name: string;

    @prop({ type: Number, required: true, unique: true })
    order: number;

    @prop({ type: [Pupil], required: false, default: [] })
    pupils: Pupil[];

    @prop({ type: String, required: true, maxlength: 7 })
    background: string;

    @prop({ type: String, required: false, default: '#FFFFFF', maxlength: 7 })
    color: string;
}
