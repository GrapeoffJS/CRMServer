import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum NoteColor {
    CompletedTask = 'crimson',
    RegularNote = 'black'
}

export class CreateNoteDTO {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsOptional()
    @IsEnum(NoteColor)
    color: string;
}
