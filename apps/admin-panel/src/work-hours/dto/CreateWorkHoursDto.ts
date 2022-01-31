import { WorkHours } from '../types/WorkHours';
import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkHoursDto {
    @ApiProperty({ type: WorkHours })
    @IsNotEmpty()
    @IsObject()
    workHours: WorkHours;
}
