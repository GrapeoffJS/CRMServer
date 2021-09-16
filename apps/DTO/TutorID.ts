import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TutorID {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    tutorID: string;
}
