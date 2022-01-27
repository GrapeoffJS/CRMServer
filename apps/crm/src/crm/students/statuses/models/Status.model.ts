import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'Statuses' } })
export class StatusModel {
    @prop({ type: () => String, required: true })
    name: string;

    @prop({ type: () => String, required: true })
    color: string;
}
