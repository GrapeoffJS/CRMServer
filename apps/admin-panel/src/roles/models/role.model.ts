import { ActionRights } from '../rights/action-rights';
import { DataRights } from '../rights/data-rights';
import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '../../../../../utils/models/base.model';

@modelOptions({ schemaOptions: { collection: 'Roles' } })
export class RoleModel extends BaseModel {
    @ApiProperty()
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty({ enum: () => ActionRights, isArray: true })
    @prop({
        type: () => [String],
        enum: () => [ActionRights],
        required: true
    })
    actionRights: string[] | ActionRights[];

    @ApiProperty({ enum: () => DataRights, isArray: true })
    @prop({
        type: () => [String],
        enum: () => [DataRights],
        required: true
    })
    dataRights: string[] | DataRights[];
}
