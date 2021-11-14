import { WorkHours } from '../models/WorkHours';
import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateWorkHoursDTO {
    @IsNotEmpty()
    @IsObject()
    workHours: WorkHours;
}
