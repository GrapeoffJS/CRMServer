import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { NoteModel } from './models/note.model';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: NoteModel
            }
        ])
    ],
    controllers: [NotesController],
    providers: [NotesService]
})
export class NotesModule {}
