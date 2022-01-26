import { index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { collection: 'RefreshTokens' } })
@index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 })
export class RefreshTokenModel extends TimeStamps {
    @prop({ type: () => Schema.Types.ObjectId, unique: true })
    owner_id: string;

    @prop({ type: () => String, unique: true })
    token: string;
}
