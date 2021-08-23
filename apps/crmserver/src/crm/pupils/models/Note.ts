import { prop } from '@typegoose/typegoose';

export class Note {
    @prop({ type: String, required: true })
    author: string;

    @prop({ type: String, required: true })
    date: string;

    @prop({ type: String, required: true })
    text: string;
}
