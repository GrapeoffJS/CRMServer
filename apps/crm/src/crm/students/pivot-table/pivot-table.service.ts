import { Injectable } from '@nestjs/common';
import { StudentModel } from '../crud/models/Student.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { StudentsPivotTableDto } from './dto/StudentsPivotTableDto';
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
        studentsPivotTableDto: StudentsPivotTableDto
    ) {
        const count = await this.studentModel
            .aggregate(new PipelineBuilder(studentsPivotTableDto).build())
            .count('count')
            .exec();

        return {
            count: count.length === 0 ? 0 : count[0].count,
            docs: await this.studentModel
                .aggregate(new PipelineBuilder(studentsPivotTableDto).build())
                .skip(offset)
                .limit(limit)
                .exec()
        };
    }
}
