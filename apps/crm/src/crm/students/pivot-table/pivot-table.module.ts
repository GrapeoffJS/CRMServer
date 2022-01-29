import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from '../models/Student.model';
import { PivotTableController } from './pivot-table.controller';
import { PivotTableService } from './pivot-table.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            }
        ])
    ],
    providers: [PivotTableService],
    controllers: [PivotTableController]
})
export class PivotTableModule {}
