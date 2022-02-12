import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsISO8601 } from 'class-validator';
import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty()
    @IsISO8601()
    @Transform(prop =>
        DateTime.fromISO(prop.value).setZone('Europe/Moscow').toISODate()
    )
    completedOn: string;

    @ApiProperty()
    @IsBoolean()
    done: boolean;

    @ApiProperty()
    @IsBoolean()
    archived: boolean;
}
