import CRMUser from 'src/crmaccounts/models/CRMUser.model';
import moment from 'moment';
import Pupil from '../pupils/models/Pupil.model';
import { ADD_PUPILS_ERRORS } from './constants';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { createGroupDTO } from './DTO/createGroupDTO';
import { filterDTO } from './DTO/filterDTO';
import { Group } from './models/Group.model';
import { InjectModel } from 'nestjs-typegoose';
import { Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';
import { Schedule } from './models/Schedule';

@Injectable()
export class GroupsService {
    constructor(
        @InjectModel(Group)
        private readonly GroupModel: ReturnModelType<typeof Group>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    async create(createGroupDTO: createGroupDTO): Promise<Group> {
        if (createGroupDTO.PUPILS.length > createGroupDTO.PLACES) {
            throw new BadRequestException(ADD_PUPILS_ERRORS.PLACES_OVERFLOW);
        }

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
            pupil.addTutor(tutor.id, group.id);
            pupil.setGroupSchedule(group.id, group.GLOBAL_SCHEDULE);
            pupil.updateGroupsList(group.id);
            1;

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

    async findAll(
        limit: number = 0,
        offset: number = 0,
        filters: filterDTO,
        response: Response
    ) {
        if (limit > 150 || limit < 0) {
            throw new BadRequestException();
        }

        const result = await this.GroupModel.aggregate(
            this.createFilterPipeline(filters) || [{ $match: {} }]
        )
            .limit(limit)
            .skip(offset);

        return response.header('Count', result.length.toString()).json(
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

    async edit(id: string, createGroupDTO: createGroupDTO): Promise<Group> {
        await this.GroupModel.updateOne({ _id: id }, createGroupDTO);
        return await this.GroupModel.findById(id).populate([
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

    async addPupils(id: string, pupilsToAdd: string[]): Promise<Group> {
        const group = await this.GroupModel.findById(id);
        const pupils = await this.PupilModel.find({ _id: pupilsToAdd });

        if (!group) {
            throw new NotFoundException();
        }

        if (group.PUPILS.length + pupilsToAdd.length > group.PLACES) {
            throw new BadRequestException(ADD_PUPILS_ERRORS.PLACES_OVERFLOW);
        }

        group?.addPupils(pupilsToAdd);

        pupils.forEach(async pupil => {
            pupil.addGroupToHistory(
                group.GROUP_NAME,
                moment().locale('ru').format('L')
            );
            pupil.addTutor(group.TUTOR, group.id);
            pupil.setGroupSchedule(group.id, group.GLOBAL_SCHEDULE);
            pupil.updateGroupsList(group.id);

            await pupil.save();
        });

        const saved = await group.save();
        return await this.GroupModel.populate(saved, [
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

    async deletePupil(groupId: string, pupilId: string): Promise<Group> {
        const group = await this.GroupModel.findById(groupId);
        const pupil = await this.PupilModel.findById(pupilId);

        if (!group || !pupil) {
            throw new NotFoundException();
        }

        group.deletePupil(pupil.id);

        pupil.deleteGroup(group.id);
        pupil.deleteTutor(group.id);

        await pupil.save();

        const saved = await group.save();
        return await this.GroupModel.populate(saved, [
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

    async addGlobalSchedule(id: string, schedule: Schedule[]): Promise<Group> {
        const group = await this.GroupModel.findById(id);
        const pupils = await this.PupilModel.find({ _id: group.PUPILS });

        if (!group) {
            throw new NotFoundException();
        }

        group.GLOBAL_SCHEDULE = schedule;

        pupils.forEach(async pupil => {
            pupil.setGroupSchedule(group.id, schedule);
            await pupil.save();
        });

        const saved = await group.save();
        return await this.GroupModel.populate(saved, [
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

    async updatePupilSchedule(
        groupId: string,
        pupilId: string,
        schedule: Schedule[]
    ): Promise<Pupil> {
        const pupil = await this.PupilModel.findById(pupilId);
        const group = await this.GroupModel.findById(groupId);

        if (!pupil) {
            throw new NotFoundException();
        }

        if (!group) {
            throw new NotFoundException();
        }

        const visitedDays = schedule.filter(schedule => {
            return (
                schedule.status !== 3 &&
                moment(schedule.date, 'DD.MM.YYYY').toDate() <=
                    moment().toDate()
            );
        });

        pupil.addVisits(visitedDays.length);
        pupil.addVisitsTo(group.GROUP_NAME, visitedDays.length);
        pupil.localSchedule.set(groupId, schedule);

        const saved = await pupil.save();
        return await this.PupilModel.findById(saved.id).populate({
            path: 'groups',
            select: '_id GROUP_NAME'
        });
    }

    async addTutor(groupId: string, tutorId: string): Promise<Group> {
        const group = await this.GroupModel.findById(groupId);
        const pupils = await this.PupilModel.find({ _id: group.PUPILS });

        if (!group) {
            throw new NotFoundException();
        }

        if (group.TUTOR) {
            const oldTutor = await this.CRMUserModel.findById(group.TUTOR);
            oldTutor.deleteGroup(group.id);

            await oldTutor.save();
        }

        const tutor = await this.CRMUserModel.findOne({
            _id: tutorId,
            role: 'teacher'
        });

        pupils.forEach(async pupil => {
            pupil.deleteTutor(group.id);
            pupil.addTutor(tutor.id, group.id);

            await pupil.save();
        });

        if (!tutor) {
            throw new NotFoundException();
        }

        group.TUTOR = tutorId;

        tutor.updateGroupsList(String(group.id));
        tutor.addGroupToHistory(
            group.GROUP_NAME,
            moment().locale('ru').format('L')
        );

        await tutor.save();

        const saved = await group.save();
        return await this.GroupModel.populate(saved, [
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

    private createFilterPipeline(filters: filterDTO) {
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
