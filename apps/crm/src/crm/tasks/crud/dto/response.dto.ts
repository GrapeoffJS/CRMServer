import { TaskModel } from '../models/task.model';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
