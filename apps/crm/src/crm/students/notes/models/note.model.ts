import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { StudentModel } from '../../crud/models/student.model';
import { CrmUserModel } from '../../../../../../admin-panel/src/crmusers/models/crm-user.model';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { BaseModel } from '../../../../../../../utils/models/base.model';

@modelOptions({
    schemaOptions: {
        collection: 'Notes'
    }
})
export class NoteModel extends BaseModel {
    @ApiProperty({ type: () => String })
    @Exclude()
    owner_id: Ref<StudentModel>;

    @ApiProperty({ type: () => CrmUserModel })
    @Type(() => CrmUserModel)
    @prop({
        type: () => CrmUserModel,
        ref: () => CrmUserModel,
        required: true,
        autopopulate: true
    })
    author: Ref<CrmUserModel>;

    @ApiProperty()
    @prop({ type: () => String, maxlength: 3000, required: true })
    text: string;

    @ApiProperty()
    @prop({ type: () => String })
    color: string;
}
