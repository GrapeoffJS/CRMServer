import { ApiProperty } from '@nestjs/swagger';
import { index, modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Schema } from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'RefreshTokens' } })
@index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 })
export class RefreshTokenModel extends TimeStamps {
    @ApiProperty()
    @prop({ type: () => Schema.Types.ObjectId, unique: true })
    owner_id: string;

    @ApiProperty()
    @prop({ type: () => String, unique: true })
    token: string;
}
