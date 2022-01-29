import { Injectable } from '@nestjs/common';
import { StudentModel } from '../models/Student.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { StudentsPivotTableDTO } from './DTO/StudentsPivotTableDTO';
import { PipelineBuilder } from './pipeline-builder';

@Injectable()
export class PivotTableService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>
    ) {}

    async filter(
        limit: number,
        offset: number,
        studentsPivotTableDTO: StudentsPivotTableDTO
    ) {
        const count = await this.studentModel
            .aggregate(new PipelineBuilder(studentsPivotTableDTO).build())
            .count('count')
            .exec();

        return {
            count: count.length === 0 ? 0 : count[0].count,
            docs: await this.studentModel
                .aggregate(new PipelineBuilder(studentsPivotTableDTO).build())
                .skip(offset)
                .limit(limit)
                .exec()
        };
    }
}
