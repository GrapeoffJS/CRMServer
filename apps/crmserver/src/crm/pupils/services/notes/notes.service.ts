import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
import Pupil from '../../models/Pupil.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Note } from '../../models/Note.model';
import { CreateNoteDTO } from '../../DTO/CreateNoteDTO';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        @InjectModel(Note)
        private readonly NoteModel: ReturnModelType<typeof Note>
    ) {}

    public async addNote(
        owner_id: string,
        { text }: CreateNoteDTO,
        { name, surname, midname }: CRMUser
    ): Promise<Pupil> {
        const pupil = await this.PupilModel.findById(owner_id);

        if (!pupil) {
            throw new NotFoundException();
        }

        if (!text) {
            throw new BadRequestException();
        }

        this.NoteModel.create({
            owner_id,
            text,
            date: new Date(),
            author: `${surname} ${name} ${midname}`
        });

        return this.PupilModel.findById(owner_id).populate([
            {
                path: 'groups',
                select: '_id group_name tutor',
                populate: {
                    path: 'tutor'
                }
            },
            {
                path: 'tutors',
                populate: [
                    {
                        path: 'tutor',
                        select: '_id name surname midname'
                    },
                    {
                        path: 'group',
                        select: '_id group_name'
                    }
                ]
            }
        ]);
    }

    public async deleteNote(id: string): Promise<Pupil> {
        const note = await this.NoteModel.findById(id);

        if (!note) {
            throw new NotFoundException();
        }

        await this.NoteModel.deleteOne({ _id: id });

        return this.PupilModel.findById(note.owner_id).populate([
            {
                path: 'groups',
                select: '_id group_name tutor',
                populate: {
                    path: 'tutor'
                }
            },
            {
                path: 'tutors',
                populate: [
                    {
                        path: 'tutor',
                        select: '_id name surname midname'
                    },
                    {
                        path: 'group',
                        select: '_id group_name'
                    }
                ]
            }
        ]);
    }
}
