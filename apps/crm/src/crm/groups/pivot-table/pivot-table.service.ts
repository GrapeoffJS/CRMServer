import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { GroupModel } from '../crud/models/group.model';
import { GroupsPivotTableDto } from './dto/groups-pivot-table.dto';
import { PipelineBuilder } from './lib/pipeline-builder';

@Injectable()
export class PivotTableService {
    constructor(
        @InjectModel(GroupModel)
        private readonly groupModel: ReturnModelType<typeof GroupModel>
    ) {}

    async filter(
        limit: number,
        offset: number,
        groupsPivotTableDto: GroupsPivotTableDto
    ) {
        const count = await this.groupModel
            .aggregate(new PipelineBuilder(groupsPivotTableDto).build())
            .count('count')
            .exec();

        return {
            count: count.length === 0 ? 0 : count[0].count,
            docs: await this.groupModel
                .aggregate(new PipelineBuilder(groupsPivotTableDto).build())
                .skip(offset)
                .limit(limit)
                .exec()
        };
    }
}
