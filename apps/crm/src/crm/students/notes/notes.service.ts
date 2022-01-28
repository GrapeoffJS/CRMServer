import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { NoteModel } from './models/Note.model';
import { CreateNoteDTO } from './DTO/CreateNoteDTO';
import { UpdateNoteDTO } from './DTO/UpdateNoteDTO';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(NoteModel)
        private readonly noteModel: ReturnModelType<typeof NoteModel>
    ) {}

    async create(studentID: string, createNoteDTO: CreateNoteDTO) {
        return this.noteModel.create({
            owner_id: studentID,
            ...createNoteDTO
        });
    }

    async update(
        studentID: string,
        noteID: string,
        updateNoteDTO: UpdateNoteDTO
    ) {
        const updated = await this.noteModel.findOneAndUpdate(
            {
                _id: noteID,
                owner_id: studentID
            },
            updateNoteDTO
        );

        if (!updated) {
            throw new NotFoundException();
        }

        return this.noteModel.findOne({ _id: noteID, owner_id: studentID });
    }

    async delete(studentID: string, noteID: string) {
        const deleted = await this.noteModel.findOneAndDelete({
            _id: noteID,
            owner_id: studentID
        });

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
