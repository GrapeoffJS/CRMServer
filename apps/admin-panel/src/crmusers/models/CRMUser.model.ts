import { modelOptions, plugin, post, prop, Ref } from '@typegoose/typegoose';
import { RoleModel } from '../../roles/models/Role.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

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
    @Exclude()
    @prop({ type: () => String, select: false, required: true })
    password: string;

    @ApiProperty({ type: () => RoleModel })
    @prop({
        type: () => RoleModel,
        ref: () => RoleModel,
        autopopulate: { maxDepth: 1 },
        required: true
    })
    role: Ref<RoleModel>;
}
