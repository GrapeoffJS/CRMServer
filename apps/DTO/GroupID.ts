import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GroupID {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    id: string;
}
