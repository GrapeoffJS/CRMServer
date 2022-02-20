import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { TaskModel } from '../models/task.model';

export class ResponseDto {
    @ApiProperty({ type: () => TaskModel, isArray: true })
    @Type(() => TaskModel)
    overdue: TaskModel[];

    @ApiProperty({ type: () => TaskModel, isArray: true })
    @Type(() => TaskModel)
    forToday: TaskModel[];

    @ApiProperty({ type: () => TaskModel, isArray: true })
    @Type(() => TaskModel)
    future: TaskModel[];

    @ApiProperty({ type: () => TaskModel, isArray: true })
    @Type(() => TaskModel)
    completedToday: TaskModel[];
}
