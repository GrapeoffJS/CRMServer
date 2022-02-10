import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupModel } from '../../groups/crud/models/group.model';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { StudentModel } from './models/student.model';
import { SalesFunnelStepModel } from '../../../../../admin-panel/src/sales-funnel/models/sales-funnel-step.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: GroupModel
            },
            {
                typegooseClass: StudentModel
            },
            {
                typegooseClass: SalesFunnelStepModel
            }
        ])
    ],
    controllers: [CrudController],
    providers: [CrudService]
})
export class CrudModule {}
