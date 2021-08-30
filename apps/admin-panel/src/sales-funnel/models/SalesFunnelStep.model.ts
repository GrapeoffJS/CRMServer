import Pupil from '../../../../crmserver/src/crm/pupils/models/Pupil.model';
import { prop } from '@typegoose/typegoose';

export class SalesFunnelStep {
    @prop({ type: String, required: true })
    name: string;

    @prop({ type: Number, required: true, unique: true })
    order: number;

    @prop({ type: [Pupil], required: false, default: [] })
    pupils: Pupil[];
}
