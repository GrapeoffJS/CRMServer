import { IsMongoId } from 'class-validator';

export class StudentID {
    @IsMongoId()
    studentID: string;
}
