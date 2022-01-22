import { prop, Ref } from '@typegoose/typegoose';
import { RoleModel } from '../../roles/models/Role.model';

export class CRMUserModel {
    @prop({ type: () => String, required: true })
    name: string;

    @prop({ type: () => String, required: true })
    surname: string;

    @prop({ type: () => String, required: true })
    midname: string;

    @prop({ type: () => String, unique: true, required: true })
    login: string;

    @prop({ type: () => String, select: false, required: true })
    password: string;

    @prop({ type: () => RoleModel, ref: () => RoleModel, required: true })
    role: Ref<RoleModel>;
}
