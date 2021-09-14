import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class TutorID {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    tutorID: string;
}
