import { StudentModel } from '../models/student.model';
import { Type } from 'class-transformer';

export class PaginatedResponseDto {
    count: number;

    @Type(() => StudentModel)
    docs: StudentModel[];
}
