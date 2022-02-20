import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteModel } from './models/note.model';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(NoteModel)
        private readonly noteModel: ReturnModelType<typeof NoteModel>
    ) {}

    async create(
        author: string,
        studentID: string,
        createNoteDto: CreateNoteDto
    ) {
        const note = await this.noteModel.create({
            owner_id: studentID,
            author,
            ...createNoteDto
        });

        return this.noteModel
            .findById(note.id)
            .populate('author')
            .lean()
            .exec();
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
            .populate('author')
            .lean()
            .exec();
    }

    async delete(studentID: string, noteID: string) {
        const deleted = await this.noteModel
            .findOneAndDelete({
                _id: noteID,
                owner_id: studentID
            })
            .lean()
            .exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
