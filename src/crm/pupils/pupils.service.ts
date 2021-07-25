import CRMUser from '../../crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from './models/Pupil.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { createPupilDTO } from './DTO/createPupilDTO';
import { decode } from 'jsonwebtoken';
import { filterDTO } from './DTO/filterDTO';
import { InjectModel } from 'nestjs-typegoose';
import { PaymentTypes } from './models/PaymentTypes';
import { Request, Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class PupilsService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    async create(createPupilDTO: createPupilDTO): Promise<Pupil> {
        return await this.PupilModel.create(createPupilDTO);
    }

    async findAll(
        limit: number = 0,
        offset: number = 0,
        filters: filterDTO,
        response: Response
    ) {
        if (limit > 150 || limit < 0) {
            throw new BadRequestException();
        }

        const filterPipeline = this.createFilterPipeline(filters);

        const result = await this.PupilModel.aggregate(
            filterPipeline || [{ $match: {} }]
        )
            .limit(limit)
            .skip(offset);

        const populated = await this.PupilModel.populate(result, {
            path: 'groups',
            select: '_id GROUP_NAME TUTOR',
            populate: {
                path: 'TUTOR'
            }
        });

        return response
            .header('Count', populated.length.toString())
            .json(populated);
    }

    async findById(id: string): Promise<Pupil> {
        const pupil = await this.PupilModel.findById(id).populate([
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

        if (!pupil) {
            throw new NotFoundException();
        }

        return pupil;
    }

    async delete(id: string): Promise<Pupil> {
        const pupil = await this.PupilModel.findByIdAndDelete(id).populate({
            path: 'groups',
            select: '_id GROUP_NAME'
        });

        if (!pupil) {
            throw new NotFoundException();
        }

        return pupil;
    }

    async edit(id: string, createPupilDTO: createPupilDTO): Promise<Pupil> {
        await this.PupilModel.updateOne({ _id: id }, createPupilDTO);

        return this.PupilModel.findById(id).populate([
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

    async createPayment(
        id: string,
        amount: number,
        subscription: string,
        request: Request
    ): Promise<Pupil> {
        const pupil = await this.PupilModel.findById(id);

        if (!pupil) {
            throw new NotFoundException();
        }

        const { name, surname, midname }: CRMUser = decode(
            request.headers.authorization.split(' ')[1]
        ) as CRMUser;

        pupil.balance += amount;
        pupil.paymentHistory.push({
            amount,
            subscription,
            date: moment().locale('ru').format('LL'),
            issuer: `${surname} ${name} ${midname}`,
            type:
                amount >= 0 ? PaymentTypes.Replenishment : PaymentTypes.Withdraw
        });

        try {
            const saved = await pupil.save();
            return await this.PupilModel.populate(saved, [
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
        } catch (err) {
            throw new BadRequestException();
        }
    }

    async addNote(id: string, text: string, request: Request): Promise<Pupil> {
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

    async deleteNote(id: string, number: number): Promise<Pupil> {
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

    private createFilterPipeline(filters: filterDTO) {
        if (!filters) return;

        const pipeline = [];

        if (filters.names) {
            const nameFilter = {
                $match: {
                    $or: []
                }
            };

            filters.names.forEach(name => {
                nameFilter.$match.$or.push({
                    name: { $regex: new RegExp(`${name}`, 'i') }
                });
            });

            pipeline.push(nameFilter);
        }

        if (filters.surnames) {
            const surnameFilter = {
                $match: {
                    $or: []
                }
            };

            filters.surnames.forEach(surname => {
                surnameFilter.$match.$or.push({
                    surname: { $regex: new RegExp(`${surname}`, 'i') }
                });
            });

            pipeline.push(surnameFilter);
        }

        if (filters.midnames) {
            const midnameFilter = {
                $match: {
                    $or: []
                }
            };

            filters.midnames.forEach(midname => {
                midnameFilter.$match.$or.push({
                    midname: { $regex: new RegExp(`${midname}`, 'i') }
                });
            });

            pipeline.push(midnameFilter);
        }

        if (filters.balance) {
            if (filters.balance.$lte) {
                pipeline.push({
                    $match: {
                        $and: [
                            {
                                balance: {
                                    $gte: filters.balance.$gte
                                }
                            },
                            {
                                balance: {
                                    $lte: filters.balance.$lte
                                }
                            }
                        ]
                    }
                });
            } else {
                pipeline.push({
                    $match: {
                        $or: [
                            {
                                balance: {
                                    $gte: filters.balance.$gte
                                }
                            },
                            {
                                balance: {
                                    $lt: filters.balance.$lt
                                }
                            }
                        ]
                    }
                });
            }
        }

        if (filters.gender) {
            pipeline.push({
                $match: {
                    gender: {
                        $in: filters.gender
                    }
                }
            });
        }

        if (filters.groups) {
            pipeline.push({
                $match: {
                    groups: {
                        $all: filters.groups
                    }
                }
            });
        }

        if (filters.ages) {
            const agesFilter = {
                $match: {
                    $or: []
                }
            };

            filters?.ages?.forEach(age => {
                agesFilter.$match.$or.push({
                    age: {
                        $gte: new Date(
                            moment()
                                .subtract(age + 1, 'years')
                                .add(1, 'day')
                                .toISOString()
                        ),
                        $lt: new Date(
                            moment().subtract(age, 'years').toISOString()
                        )
                    }
                });
            });

            pipeline.push(agesFilter);
        }

        if (filters.tutors) {
            pipeline.push({
                $match: {
                    'tutors.tutor': { $in: filters.tutors }
                }
            });
        }

        return pipeline;
    }
}
