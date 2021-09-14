import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class PupilID {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    pupilID: string;
}
