import CRMUser from 'apps/admin-panel/src/crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from '../../../pupils/models/Pupil.model';
import { CreateGroupDTO } from '../../DTO/CreateGroupDTO';
import { FilterDTO } from '../../DTO/FilterDTO';
import { Group } from '../../models/Group.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
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
        if (createGroupDTO.tutor === '') createGroupDTO.tutor = null;

        const tutor = await this.CRMUserModel.findById(createGroupDTO.tutor);
        const group = await this.GroupModel.create(createGroupDTO);
        const pupils = await this.PupilModel.find({
            _id: createGroupDTO.pupils
        });

        tutor?.updateGroupsList(group.id);
        tutor?.addGroupToHistory(
            group.group_name,
            moment().locale('ru').format('L')
        );

        for (const pupil of pupils) {
            pupil.addGroupToHistory(
                group.group_name,
                moment().locale('ru').format('L')
            );

            if (group.tutor) await pupil.addTutor(tutor.id, group.id);

            pupil.setGroupSchedule(group.id, group.global_schedule);
            pupil.updateGroupsList(group.id);

            await pupil.save();
        }

        await tutor?.save();

        return await this.GroupModel.populate(group, [
            {
                path: 'pupils',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            },
            {
                path: 'tutor',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            }
        ]);
    }

    public async findAll(
        limit,
        offset,
        filters: FilterDTO,
        dataPermissions: DataPermissions
    ) {
        const result = await this.GroupModel.aggregate(
            this.createFilterPipeline(filters)?.concat({
                $project: dataPermissions.forGroup
            }) || [{ $match: {} }, { $project: dataPermissions.forGroup }]
        )
            .skip(offset)
            .limit(limit);

        console.log(result);

        const count = await this.GroupModel.aggregate(
            this.createFilterPipeline(filters) || [{ $match: {} }]
        ).count('count');

        return {
            groups: await this.GroupModel.populate(result, [
                {
                    path: 'pupils',
                    populate: {
                        path: 'groups',
                        select: '_id group_name'
                    }
                },
                {
                    path: 'tutor',
                    populate: {
                        path: 'groups',
                        select: '_id group_name'
                    }
                }
            ]),
            count: count[0]?.count
        };
    }

    public async findById(
        id: string,
        dataPermissions: DataPermissions
    ): Promise<Group> {
        const group = await this.GroupModel.findById(id).select(
            dataPermissions.forGroup
        );

        if (!group) {
            throw new NotFoundException();
        }

        return await this.GroupModel.populate(group, [
            {
                path: 'pupils',
                select: '+localSchedule',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            },
            {
                path: 'tutor',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            },
            {
                path: 'paymentHistory',
                populate: {
                    path: 'subscription'
                }
            }
        ]);
    }

    public async findByIds(
        ids: string[],
        dataPermissions: DataPermissions
    ): Promise<Group[]> {
        return this.GroupModel.find({ _id: ids })
            .select(dataPermissions.forGroup)
            .populate([
                {
                    path: 'pupils',
                    select: '+localSchedule',
                    populate: {
                        path: 'groups',
                        select: '_id group_name'
                    }
                },
                {
                    path: 'tutor',
                    populate: {
                        path: 'groups',
                        select: '_id group_name'
                    }
                }
            ]);
    }

    public async delete(
        id: string,
        dataPermissions: DataPermissions
    ): Promise<Group> {
        const group = await this.GroupModel.findByIdAndDelete(id).select(
            dataPermissions.forGroup
        );

        if (!group) {
            throw new NotFoundException();
        }

        return await this.GroupModel.populate(group, [
            {
                path: 'pupils',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            },
            {
                path: 'tutor',
                populate: {
                    path: 'groups',
                    select: '_id group_name'
                }
            }
        ]);
    }

    public async edit(
        id: string,
        updateGroupDTO: UpdateGroupDTO,
        dataPermissions: DataPermissions
    ): Promise<Group> {
        await this.GroupModel.findOneAndUpdate({ _id: id }, updateGroupDTO);

        const group = await this.GroupModel.findById(id)
            .select(dataPermissions.forGroup)
            .populate([
                {
                    path: 'pupils',
                    populate: {
                        path: 'groups',
                        select: '_id group_name'
                    }
                },
                {
                    path: 'tutor',
                    populate: {
                        path: 'groups',
                        select: '_id group_name'
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
                        $size: '$pupils'
                    }
                }
            }
        ];

        if (filters.group_names) {
            const escapeRegExp = (string: string) => {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            };

            const groupNameFilter = {
                $match: {
                    $or: []
                }
            };

            filters.group_names.forEach(group_name => {
                groupNameFilter.$match.$or.push({
                    group_name: {
                        $regex: new RegExp(`${escapeRegExp(group_name)}`, 'i')
                    }
                });
            });

            pipeline.push(groupNameFilter);
        }

        if (filters.levels) {
            pipeline.push({
                $match: {
                    level: {
                        $in: filters.levels
                    }
                }
            });
        }

        if (filters.tutors) {
            pipeline.push({
                $match: {
                    tutor: {
                        $in: filters.tutors
                    }
                }
            });
        }

        if (filters.occupied === true) {
            pipeline.push({
                $match: {
                    $expr: {
                        $eq: ['$occupiedPlaces', '$places']
                    }
                }
            });
        }

        if (filters.occupied === false) {
            pipeline.push({
                $match: {
                    $expr: {
                        $lt: ['$occupiedPlaces', '$places']
                    }
                }
            });
        }

        return pipeline;
    }
}
