import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RoleModel } from '../../roles/models/role.model';

@plugin(mongooseAutoPopulate)
@modelOptions({ schemaOptions: { collection: 'CRMUsers' } })
export class CrmUserModel extends TimeStamps {
    @ApiProperty()
    @prop({
        type: () => String,
        required: true
    })
    name: string;

    @ApiProperty()
    @prop({
        type: () => String,
        required: true
    })
    surname: string;

    @ApiProperty()
    @prop({
        type: () => String,
        required: true
    })
    middleName: string;

    @ApiProperty()
    @Exclude()
    @prop({
        type: () => String,
        unique: true,
        required: true
    })
    login: string;

    @ApiProperty()
    @Exclude()
    @prop({ type: () => String, required: true })
    password: string;

    @ApiProperty({ type: () => RoleModel })
    @Exclude()
    @prop({
        type: () => RoleModel,
        ref: () => RoleModel,
        required: true,
        autopopulate: true
    })
    role: Ref<RoleModel>;
}
