import Pupil from '../../models/Pupil.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreatePupilDTO } from '../../DTO/CreatePupilDTO';
import { FilterDTO } from '../../DTO/FilterDTO';
import { InjectModel } from 'nestjs-typegoose';
import { Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';
import { SearchIndexerService } from 'src/search-indexer/search-indexer.service';
import { UpdatePupilDTO } from '../../DTO/UpdatePupilDTO';
import moment from 'moment';

@Injectable()
export class CrudService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        private readonly searchIndexer: SearchIndexerService
    ) {}

    async create(createPupilDTO: CreatePupilDTO): Promise<Pupil> {
        const pupil = await this.PupilModel.create(createPupilDTO);

        await this.searchIndexer.createPupilIndex(pupil);

        return pupil;
    }

    async findAll(
        limit = 0,
        offset = 0,
        filters: FilterDTO,
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

        this.PupilModel.find().countDocuments((err, count) => {
            return response.header('Count', count.toString()).json(populated);
        });
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

        await this.searchIndexer.deletePupilIndex(id);

        return pupil;
    }

    async edit(id: string, updatePupilDTO: UpdatePupilDTO): Promise<Pupil> {
        await this.PupilModel.updateOne({ _id: id }, updatePupilDTO);

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

        await this.searchIndexer.updatePupilIndex(pupil);

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
