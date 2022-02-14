import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupModel } from '../crud/models/group.model';
import { PivotTableController } from './pivot-table.controller';
import { PivotTableService } from './pivot-table.service';

@Module({
    imports: [TypegooseModule.forFeature([{ typegooseClass: GroupModel }])],
    controllers: [PivotTableController],
    providers: [PivotTableService]
})
export class PivotTableModule {}
