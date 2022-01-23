import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { StudentModel } from './Student.model';
import { CRMUserModel } from '../../../../../admin-panel/src/crmusers/models/CRMUser.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongooseAutoPopulate from 'mongoose-autopopulate';

@plugin(mongooseAutoPopulate)
@modelOptions({
    schemaOptions: {
        collection: 'Notes'
    }
})
export class NoteModel extends TimeStamps {
    @prop({ type: () => StudentModel, ref: () => StudentModel, required: true })
    owner_id: Ref<StudentModel>;

    @prop({
        type: () => CRMUserModel,
        ref: () => CRMUserModel,
        autopopulate: true,
        required: true
    })
    author: Ref<CRMUserModel>;

    @prop({ type: () => String, required: true })
    text: string;

    @prop({ type: () => String })
    color: string;
}
