import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from '@utils/models/base.model';

@modelOptions({ schemaOptions: { collection: 'TaskTags' } })
export class TaskTagModel extends BaseModel {
    @ApiProperty()
    @prop({ type: () => String })
    name: string;

    @ApiProperty()
    @prop({ type: () => String })
    color: string;
}
