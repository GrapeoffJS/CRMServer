import { Type } from 'class-transformer';
import { StudentModel } from '../models/student.model';

export class PaginatedResponseDto {
    count: number;

    @Type(() => StudentModel)
    docs: StudentModel[];
}
