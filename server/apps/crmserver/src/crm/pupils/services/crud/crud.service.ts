import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import { CreatePupilDTO } from '../../DTO/CreatePupilDTO';
import { FilterDTO } from '../../DTO/FilterDTO';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdatePupilDTO } from '../../DTO/UpdatePupilDTO';
import { DataPermissions } from 'apps/admin-panel/src/roles/models/DataPermissions';
import { Types } from 'mongoose';

@Injectable()
export class CrudService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    async create(createPupilDTO: CreatePupilDTO): Promise<Pupil> {
        return this.PupilModel.create(createPupilDTO);
    }

    async findAll(
        limit: number,
        offset: number,
        filters: FilterDTO,
        dataPermissions: DataPermissions
    ) {
        const result = await this.PupilModel.aggregate(
            this.createFilterPipeline(filters)?.concat({
                $project: { ...dataPermissions.forPupil, createdAt: 1 }
            }) || [
                { $match: {} },
                { $project: { ...dataPermissions.forPupil, createdAt: 1 } }
            ]
        )
            .skip(offset)
            .limit(limit);

        const count = await this.PupilModel.aggregate(
            this.createFilterPipeline(filters) || [{ $match: {} }]
        ).count('count');

        return {
            count: count[0]?.count?.toString(),
            pupils: await this.PupilModel.populate(result, [
                {
                    path: 'groups',
                    select: '_id group_name tutor',
                    populate: {
                        path: 'tutor'
                    }
                },
                {
                    path: 'statuses'
                },
                {
                    path: 'notes'
                }
            ])
        };
    }

    async findById(
        id: string,
        dataPermissions: DataPermissions
    ): Promise<Pupil> {
        const pupil = await this.PupilModel.aggregate([
            {
                $project: { ...dataPermissions.forPupil, createdAt: 1 }
            },
            {
                $match: {
                    _id: Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'Tasks',
                    as: 'tasks',
                    let: {
                        pupilId: '$_id'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$for', '$$pupilId']
                                }
                            }
                        },
                        {
                            $project: {
                                for: 0
                            }
                        },
                        {
                            $lookup: {
                                from: 'CRMUsers',
                                as: 'responsible',
                                let: {
                                    responsible: '$responsible'
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$_id', '$$responsible']
                                            }
                                        }
                                    },
                                    {
                                        $project: {
                                            name: 1,
                                            surname: 1,
                                            midname: 1,
                                            accountType: 1,
                                            _id: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: 'TaskTags',
                                as: 'tags',
                                localField: 'tags',
                                foreignField: '_id'
                            }
                        }
                    ]
                }
            }
        ]);

        if (!pupil) {
            throw new NotFoundException();
        }

        const populated = await this.PupilModel.populate(pupil, [
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
            },
            {
                path: 'paymentHistory',
                populate: {
                    path: 'subscription'
                }
            },
            {
                path: 'statuses'
            },
            {
                path: 'notes'
            },
            {
                path: 'salesFunnelStep'
            }
        ]);

        return populated[0];
    }

    async delete(id: string, dataPermissions: DataPermissions): Promise<Pupil> {
        const pupil = await this.PupilModel.findByIdAndDelete(id)
            .select(dataPermissions.forPupil)
            .populate({
                path: 'groups',
                select: '_id group_name'
            });

        if (!pupil) {
            throw new NotFoundException();
        }

        return pupil;
    }

    async edit(
        id: string,
        updatePupilDTO: UpdatePupilDTO,
        dataPermissions: DataPermissions
    ): Promise<Pupil> {
        await this.PupilModel.findOneAndUpdate({ _id: id }, updatePupilDTO);

        return this.PupilModel.findById(id)
            .select(dataPermissions.forPupil)
            .populate([
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
                },
                {
                    path: 'statuses'
                },
                {
                    path: 'notes'
                }
            ]);
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
                agesFilter.$match.$or.push({ dateOfBirth: null });
            }

            filters?.ages?.forEach(age => {
                agesFilter.$match.$or.push({
                    dateOfBirth: {
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
            pipeline.push({ $match: { dateOfBirth: null } });
        }

        if (filters.tutors) {
            pipeline.push({
                $match: {
                    'tutors.tutor': { $in: filters.tutors }
                }
            });
        }

        if (filters.statuses) {
            pipeline.push({
                $match: {
                    statuses: {
                        $all: filters.statuses.map(status =>
                            Types.ObjectId(status)
                        )
                    }
                }
            });
        }

        return pipeline;
    }
}
