import { prop } from '@typegoose/typegoose';
import { ActionPermissions } from '../types/ActionPermissions';
import { DataPermissions } from '../types/DataPermissions';

export class RoleModel {
    @prop({ type: () => String, required: true, unique: true })
    name: string;

    @prop({
        type: [Number],
        enum: ActionPermissions,
        required: true
    })
    actionPermissions: ActionPermissions[];

    @prop({
        type: Object,
        required: true
    })
    dataPermissions: DataPermissions;
}
