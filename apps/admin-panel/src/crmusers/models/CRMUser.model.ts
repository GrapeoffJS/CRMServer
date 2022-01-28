import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { RoleModel } from '../../roles/models/Role.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { ApiProperty } from '@nestjs/swagger';

@plugin(mongooseAutoPopulate)
@modelOptions({ schemaOptions: { collection: 'CRMUsers' } })
export class CRMUserModel extends TimeStamps {
    @ApiProperty()
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @prop({ type: () => String, required: true })
    surname: string;

    @ApiProperty()
    @prop({ type: () => String, required: true })
    middleName: string;

    @ApiProperty()
    @prop({ type: () => String, unique: true, required: true })
    login: string;

    @ApiProperty()
    @prop({ type: () => String, select: false, required: true })
    password: string;

    @ApiProperty({ type: () => RoleModel })
    @prop({
        type: () => RoleModel,
        ref: () => RoleModel,
        autopopulate: true,
        required: true
    })
    role: Ref<RoleModel>;
}
