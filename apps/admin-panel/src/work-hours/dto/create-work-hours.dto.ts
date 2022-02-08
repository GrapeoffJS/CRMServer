import { WorkHours } from '../types/work-hours';
import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkHoursDto {
    @ApiProperty({ type: WorkHours, required: true })
    @IsNotEmpty()
    @IsObject()
    workHours: WorkHours;
}
