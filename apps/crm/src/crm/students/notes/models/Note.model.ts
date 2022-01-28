import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { StudentModel } from '../../models/Student.model';
import { CRMUserModel } from '../../../../../../admin-panel/src/crmusers/models/CRMUser.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { ApiProperty } from '@nestjs/swagger';

@plugin(mongooseAutoPopulate)
@modelOptions({
    schemaOptions: {
        collection: 'Notes'
    }
})
export class NoteModel extends TimeStamps {
    @ApiProperty({ type: () => String })
    @prop({ type: () => StudentModel, ref: () => StudentModel, required: true })
    owner_id: Ref<StudentModel>;

    @ApiProperty({ type: () => CRMUserModel })
    @prop({
        type: () => CRMUserModel,
        ref: () => CRMUserModel,
        autopopulate: true,
        required: true
    })
    author: Ref<CRMUserModel>;

    @ApiProperty()
    @prop({ type: () => String, required: true })
    text: string;

    @ApiProperty()
    @prop({ type: () => String })
    color: string;
}
