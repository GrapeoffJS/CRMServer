import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { RoleModel } from '../../roles/models/Role.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongooseAutoPopulate from 'mongoose-autopopulate';

@plugin(mongooseAutoPopulate)
@modelOptions({ schemaOptions: { collection: 'CRMUsers' } })
export class CRMUserModel extends TimeStamps {
    @prop({ type: () => String, required: true })
    name: string;

    @prop({ type: () => String, required: true })
    surname: string;

    @prop({ type: () => String, required: true })
    middleName: string;

    @prop({ type: () => String, unique: true, required: true })
    login: string;

    @prop({ type: () => String, select: false, required: true })
    password: string;

    @prop({
        type: () => RoleModel,
        ref: () => RoleModel,
        autopopulate: true,
        required: true
    })
    role: Ref<RoleModel>;
}
