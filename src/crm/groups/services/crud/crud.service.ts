import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from 'src/crm/pupils/models/Pupil.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateGroupDTO } from '../../DTO/CreateGroupDTO';
import { FilterDTO } from '../../DTO/FilterDTO';
import { Group } from '../../models/Group.model';
import { InjectModel } from 'nestjs-typegoose';
import { Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';
import { SearchIndexerService } from 'src/search-indexer/search-indexer.service';
import { UpdateGroupDTO } from '../../DTO/UpdateGroupDTO';

@Injectable()
export class CrudService {
    constructor(
        @InjectModel(Group)
        private readonly GroupModel: ReturnModelType<typeof Group>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>,
        private readonly searchIndexer: SearchIndexerService
    ) {}

    async create(createGroupDTO: CreateGroupDTO): Promise<Group> {
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

        await this.searchIndexer.createGroupIndex(group);

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

    async findAll(limit, offset, filters: FilterDTO, response: Response) {
        const result = await this.GroupModel.aggregate(
            this.createFilterPipeline(filters) || [{ $match: {} }]
        )
            .limit(limit)
            .skip(offset);

        this.GroupModel.find().countDocuments(async (err, count) => {
            return response.header('Count', count.toString()).json(
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
        });
    }

    async findById(id: string): Promise<Group> {
        const group = await this.GroupModel.findById(id);

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

    async findByIds(ids: string[]): Promise<Group[]> {
        return await this.GroupModel.find({ _id: ids }).populate([
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

    async delete(id: string): Promise<Group> {
        const group = await this.GroupModel.findByIdAndDelete(id);

        if (!group) {
            throw new NotFoundException();
        }

        await this.searchIndexer.deleteGroupIndex(id);

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

    async edit(id: string, updateGroupDTO: UpdateGroupDTO): Promise<Group> {
        await this.GroupModel.updateOne({ _id: id }, updateGroupDTO);

        const group = await this.GroupModel.findById(id).populate([
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

        await this.searchIndexer.updateGroupIndex(group);

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
