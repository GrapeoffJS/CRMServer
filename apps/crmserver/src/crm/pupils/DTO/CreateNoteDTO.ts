import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDTO {
    @IsNotEmpty()
    @IsString()
    text: string;
}
