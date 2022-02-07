import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({ schemaOptions: { collection: 'Statuses' } })
export class StatusModel {
    @ApiProperty()
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @prop({ type: () => String, required: true })
    color: string;
}
