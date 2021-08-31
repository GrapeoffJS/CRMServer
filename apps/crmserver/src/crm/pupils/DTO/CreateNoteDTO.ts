import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    owner_id: string;

    @IsNotEmpty()
    @IsString()
    text: string;
}
