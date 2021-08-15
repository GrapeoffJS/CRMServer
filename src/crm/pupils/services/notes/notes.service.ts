import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { InjectModel } from 'nestjs-typegoose';
import { Request } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    public async addNote(
        id: string,
        text: string,
        request: Request
    ): Promise<Pupil> {
        const pupil = await this.PupilModel.findById(id);
        const { name, surname, midname } = decode(
            request.headers.authorization.split(' ')[1]
        ) as CRMUser;

        if (!pupil) {
            throw new NotFoundException();
        }

        if (!text) {
            throw new BadRequestException();
        }

        pupil.notes.push({
            author: `${surname} ${name} ${midname}`,
            date: moment().locale('ru').format('LLLL'),
            text
        });

        await pupil.save();

        return await this.PupilModel.findById(id).populate([
            {
                path: 'groups',
                select: '_id GROUP_NAME TUTOR',
                populate: {
                    path: 'TUTOR'
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
                        select: '_id GROUP_NAME'
                    }
                ]
            }
        ]);
    }

    public async deleteNote(id: string, number: number): Promise<Pupil> {
        const pupil = await this.PupilModel.findById(id);

        if (!pupil) {
            throw new NotFoundException();
        }

        pupil.notes.splice(number, 1);

        await pupil.save();

        return await this.PupilModel.findById(id).populate([
            {
                path: 'groups',
                select: '_id GROUP_NAME TUTOR',
                populate: {
                    path: 'TUTOR'
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
                        select: '_id GROUP_NAME'
                    }
                ]
            }
        ]);
    }
}
