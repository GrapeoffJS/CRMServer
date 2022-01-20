import { prop, Ref } from '@typegoose/typegoose';
import { Role } from '../../roles/models/Role.model';

export class CRMUser {
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

    @prop({ type: () => Role, ref: () => Role, required: true })
    role: Ref<Role>;
}
