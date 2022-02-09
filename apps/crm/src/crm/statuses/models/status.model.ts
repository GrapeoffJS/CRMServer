import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '../../../../../../utils/models/base.model';

@modelOptions({ schemaOptions: { collection: 'Statuses' } })
export class StatusModel extends BaseModel {
    @ApiProperty()
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @prop({ type: () => String, required: true })
    color: string;
}
