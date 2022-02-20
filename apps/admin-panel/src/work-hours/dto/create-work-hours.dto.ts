import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';
import { WorkHours } from '../types/work-hours';

export class CreateWorkHoursDto {
    @ApiProperty({ type: WorkHours, required: true })
    @IsNotEmpty()
    @IsObject()
    workHours: WorkHours;
}
