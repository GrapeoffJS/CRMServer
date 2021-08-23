import { prop } from '@typegoose/typegoose';
import { ActionPermissions } from './ActionPermissions';
import { DataPermissions } from './DataPermissions';

export class Role {
    @prop({ type: String, required: true, unique: true })
    name: string;

    @prop({
        type: [Number],
        enum: ActionPermissions,
        required: true
    })
    actionPermissions: ActionPermissions[];

    @prop({
        type: [String],
        enum: DataPermissions,
        required: true
    })
    dataPermissions: DataPermissions[];
}
