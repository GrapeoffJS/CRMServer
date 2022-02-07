import { IsMongoId } from 'class-validator';

export class StudentId {
    @IsMongoId()
    studentID: string;
}
