import { prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export class Note {
    @prop({ type: Schema.Types.ObjectId, required: true })
    owner_id: string;

    @prop({ type: String, required: true })
    author: string;

    @prop({ type: Date, required: true })
    date: string;

    @prop({ type: String, required: true })
    text: string;
}
