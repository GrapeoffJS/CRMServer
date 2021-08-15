import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import { CreatePupilDTO } from '../../DTO/CreatePupilDTO';
import { FilterDTO } from '../../DTO/FilterDTO';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdatePupilDTO } from '../../DTO/UpdatePupilDTO';

@Injectable()
export class CrudService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    public async create(createPupilDTO: CreatePupilDTO): Promise<Pupil> {
        const pupil = await this.PupilModel.create(createPupilDTO);
        return pupil;
    }

    public async findAll(
        limit: number,
        offset: number,
        filters: FilterDTO,
        response: Response
    ) {
        const result = await this.PupilModel.aggregate(
            this.createFilterPipeline(filters) || [{ $match: {} }]
        )
            .skip(offset)
            .limit(limit);

        const count = await this.PupilModel.aggregate(
            this.createFilterPipeline(filters) || [{ $match: {} }]
        ).count('count');

        const populated = await this.PupilModel.populate(result, {
            path: 'groups',
            select: '_id GROUP_NAME TUTOR',
            populate: {
                path: 'TUTOR'
            }
        });

        return response
            .header('Count', count[0]?.count?.toString() || '0')
            .json(populated);
    }

    public async findById(id: string): Promise<Pupil> {
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

    public async delete(id: string): Promise<Pupil> {
        const pupil = await this.PupilModel.findByIdAndDelete(id).populate({
            path: 'groups',
            select: '_id GROUP_NAME'
        });

        if (!pupil) {
            throw new NotFoundException();
        }

        return pupil;
    }

    public async edit(
        id: string,
        updatePupilDTO: UpdatePupilDTO
    ): Promise<Pupil> {
        await this.PupilModel.findOneAndUpdate({ _id: id }, updatePupilDTO);

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

        return pupil;
    }

    private createFilterPipeline(filters: FilterDTO): any[] {
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

            if (filters.emptyAge === true) {
                agesFilter.$match.$or.push({ age: null });
            }

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
        } else if (!filters.ages && filters.emptyAge === true) {
            pipeline.push({ $match: { age: null } });
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
