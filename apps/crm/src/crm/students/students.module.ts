import { Module } from '@nestjs/common';
import { StudentsService } from './services/students/students.service';
import { PivotTableService } from './services/pivot-table/pivot-table.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { StudentModel } from './models/Student.model';
import { StudentsController } from './controllers/students/students.controller';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            }
        ])
    ],
    providers: [StudentsService, PivotTableService],
    controllers: [StudentsController]
})
export class StudentsModule {}
