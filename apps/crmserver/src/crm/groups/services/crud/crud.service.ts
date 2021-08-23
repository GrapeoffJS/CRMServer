import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from '../../../pupils/models/Pupil.model';
import { CreateGroupDTO } from '../../DTO/CreateGroupDTO';
import { FilterDTO } from '../../DTO/FilterDTO';
import { Group } from '../../models/Group.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateGroupDTO } from '../../DTO/UpdateGroupDTO';
import { DataPermissions } from '../../../../../../admin-panel/src/roles/models/DataPermissions';

@Injectable()
export class CrudService {
    constructor(
        @InjectModel(Group)
        private readonly GroupModel: ReturnModelType<typeof Group>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    public async create(createGroupDTO: CreateGroupDTO): Promise<Group> {
        if (createGroupDTO.TUTOR === '') createGroupDTO.TUTOR = null;

        const tutor = await this.CRMUserModel.findById(createGroupDTO.TUTOR);
        const group = await this.GroupModel.create(createGroupDTO);
        const pupils = await this.PupilModel.find({
            _id: createGroupDTO.PUPILS
        });

        tutor?.updateGroupsList(group.id);
        tutor?.addGroupToHistory(
            group.GROUP_NAME,
            moment().locale('ru').format('L')
        );

        pupils.forEach(async pupil => {
            pupil.addGroupToHistory(
                group.GROUP_NAME,
                moment().locale('ru').format('L')
            );

            if (group.TUTOR) pupil.addTutor(tutor.id, group.id);

            pupil.setGroupSchedule(group.id, group.GLOBAL_SCHEDULE);
            pupil.updateGroupsList(group.id);

            await pupil.save();
        });

        await tutor?.save();

        return await this.GroupModel.populate(group, [
            {
                path: 'PUPILS',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            },
            {
                path: 'TUTOR',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            }
        ]);
    }

    public async findAll(
        limit,
        offset,
        filters: FilterDTO,
        response: Response,
        dataPermissions: DataPermissions[]
    ) {
        const permissionsFilter = {
            $project: {
                GROUP_NAME:
                    dataPermissions.findIndex(
                        permission => permission === '+GROUP_NAME'
                    ) !== -1
                        ? 1
                        : undefined,
                LEVEL:
                    dataPermissions.findIndex(
                        permission => permission === '+LEVEL'
                    ) !== -1
                        ? 1
                        : undefined,
                PLACES:
                    dataPermissions.findIndex(
                        permission => permission === '+PLACES'
                    ) !== -1
                        ? 1
                        : undefined,
                TUTOR:
                    dataPermissions.findIndex(
                        permission => permission === '+TUTOR'
                    ) !== -1
                        ? 1
                        : undefined,
                PUPILS:
                    dataPermissions.findIndex(
                        permission => permission === '+PUPILS'
                    ) !== -1
                        ? 1
                        : undefined,
                GLOBAL_SCHEDULE:
                    dataPermissions.findIndex(
                        permission => permission === '+GLOBAL_SCHEDULE'
                    ) !== -1
                        ? 1
                        : undefined
            }
        };

        const result = await this.GroupModel.aggregate(
            this.createFilterPipeline(filters)?.concat(permissionsFilter) || [
                { $match: {} },
                permissionsFilter
            ]
        )
            .skip(offset)
            .limit(limit);

        const count = await this.GroupModel.aggregate(
            this.createFilterPipeline(filters) || [{ $match: {} }]
        ).count('count');

        return response
            .header('Count', count[0]?.count?.toString() || '0')
            .json(
                await this.GroupModel.populate(result, [
                    {
                        path: 'PUPILS',
                        populate: {
                            path: 'groups',
                            select: '_id GROUP_NAME'
                        }
                    },
                    {
                        path: 'TUTOR',
                        populate: {
                            path: 'groups',
                            select: '_id GROUP_NAME'
                        }
                    }
                ])
            );
    }

    public async findById(
        id: string,
        dataPermissions: DataPermissions[]
    ): Promise<Group> {
        const group = await this.GroupModel.findById(id).select(
            dataPermissions.join(' ')
        );

        if (!group) {
            throw new NotFoundException();
        }

        return await this.GroupModel.populate(group, [
            {
                path: 'PUPILS',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            },
            {
                path: 'TUTOR',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            }
        ]);
    }

    public async findByIds(
        ids: string[],
        dataPermissions: DataPermissions[]
    ): Promise<Group[]> {
        return await this.GroupModel.find({ _id: ids })
            .select(dataPermissions.join(' '))
            .populate([
                {
                    path: 'PUPILS',
                    populate: {
                        path: 'groups',
                        select: '_id GROUP_NAME'
                    }
                },
                {
                    path: 'TUTOR',
                    populate: {
                        path: 'groups',
                        select: '_id GROUP_NAME'
                    }
                }
            ]);
    }

    public async delete(
        id: string,
        dataPermissions: DataPermissions[]
    ): Promise<Group> {
        const group = await this.GroupModel.findByIdAndDelete(id).select(
            dataPermissions.join(' ')
        );

        if (!group) {
            throw new NotFoundException();
        }

        return await this.GroupModel.populate(group, [
            {
                path: 'PUPILS',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            },
            {
                path: 'TUTOR',
                populate: {
                    path: 'groups',
                    select: '_id GROUP_NAME'
                }
            }
        ]);
    }

    public async edit(
        id: string,
        updateGroupDTO: UpdateGroupDTO,
        dataPermissions: DataPermissions[]
    ): Promise<Group> {
        await this.GroupModel.findOneAndUpdate({ _id: id }, updateGroupDTO);

        const group = await this.GroupModel.findById(id)
            .select(dataPermissions.join(' '))
            .populate([
                {
                    path: 'PUPILS',
                    populate: {
                        path: 'groups',
                        select: '_id GROUP_NAME'
                    }
                },
                {
                    path: 'TUTOR',
                    populate: {
                        path: 'groups',
                        select: '_id GROUP_NAME'
                    }
                }
            ]);

        return group;
    }

    private createFilterPipeline(filters: FilterDTO): any {
        if (!filters) return;

        const pipeline: any = [
            {
                $addFields: {
                    occupiedPlaces: {
                        $size: '$PUPILS'
                    }
                }
            }
        ];

        if (filters.GROUP_NAMES) {
            const escapeRegExp = (string: string) => {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            };

            const groupNameFilter = {
                $match: {
                    $or: []
                }
            };

            filters.GROUP_NAMES.forEach(GROUP_NAME => {
                groupNameFilter.$match.$or.push({
                    GROUP_NAME: {
                        $regex: new RegExp(`${escapeRegExp(GROUP_NAME)}`, 'i')
                    }
                });
            });

            pipeline.push(groupNameFilter);
        }

        if (filters.LEVELS) {
            pipeline.push({
                $match: {
                    LEVEL: {
                        $in: filters.LEVELS
                    }
                }
            });
        }

        if (filters.TUTORS) {
            pipeline.push({
                $match: {
                    TUTOR: {
                        $in: filters.TUTORS
                    }
                }
            });
        }

        if (filters.OCCUPIED === true) {
            pipeline.push({
                $match: {
                    $expr: {
                        $eq: ['$occupiedPlaces', '$PLACES']
                    }
                }
            });
        }

        if (filters.OCCUPIED === false) {
            pipeline.push({
                $match: {
                    $expr: {
                        $lt: ['$occupiedPlaces', '$PLACES']
                    }
                }
            });
        }

        return pipeline;
    }
}
