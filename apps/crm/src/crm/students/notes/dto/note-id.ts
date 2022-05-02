import { IsMongoId } from 'class-validator';

export class NoteId {
    @IsMongoId()
    noteID: string;
}
