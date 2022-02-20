import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsISO8601, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsOptional()
    @ApiProperty()
    @IsISO8601()
    completedOn: string;

    @IsOptional()
    @ApiProperty()
    @IsBoolean()
    done: boolean;

    @IsOptional()
    @ApiProperty()
    @IsBoolean()
    archived: boolean;
}
