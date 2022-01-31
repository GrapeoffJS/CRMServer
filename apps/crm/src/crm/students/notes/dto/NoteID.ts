import { IsMongoId } from 'class-validator';

export class NoteID {
    @IsMongoId()
    noteID: string;
}
