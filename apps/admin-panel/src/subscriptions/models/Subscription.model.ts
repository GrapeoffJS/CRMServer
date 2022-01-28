import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionModel {
    @ApiProperty()
    @prop({ type: () => String, required: true })
    name: string;

    @ApiProperty()
    @prop({ type: () => Number, required: true })
    price: number;

    @ApiProperty()
    @prop({ type: () => Number, required: true })
    hoursCount: number;
}
