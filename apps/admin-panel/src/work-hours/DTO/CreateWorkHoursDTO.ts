import { WorkHours } from '../models/WorkHours';
import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkHoursDTO {
    @ApiProperty({ type: WorkHours })
    @IsNotEmpty()
    @IsObject()
    workHours: WorkHours;
}
