import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { NoteModel } from './models/Note.model';
import { CreateNoteDto } from './dto/CreateNoteDto';
import { UpdateNoteDto } from './dto/UpdateNoteDto';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(NoteModel)
        private readonly noteModel: ReturnModelType<typeof NoteModel>
    ) {}

    async create(studentID: string, createNoteDto: CreateNoteDto) {
        return this.noteModel.create({
            owner_id: studentID,
            ...createNoteDto
        });
    }

    async update(
        studentID: string,
        noteID: string,
        updateNoteDto: UpdateNoteDto
    ) {
        const updated = await this.noteModel
            .findOneAndUpdate(
                {
                    _id: noteID,
                    owner_id: studentID
                },
                updateNoteDto
            )
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        return this.noteModel
            .findOne({ _id: noteID, owner_id: studentID })
            .exec();
    }

    async delete(studentID: string, noteID: string) {
        const deleted = await this.noteModel
            .findOneAndDelete({
                _id: noteID,
                owner_id: studentID
            })
            .exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
