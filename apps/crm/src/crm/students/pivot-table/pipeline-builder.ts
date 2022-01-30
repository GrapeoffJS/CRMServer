import { StudentsPivotTableDTO } from './DTO/StudentsPivotTableDTO';
import { DateTime } from 'luxon';
import { PipelineStage, Types } from 'mongoose';

export class PipelineBuilder {
    private pipeline: PipelineStage[] = [
        {
            $lookup: {
                from: 'Groups',
                as: 'groups',
                foreignField: 'students',
                localField: '_id'
            }
        },
        {
            $lookup: {
                from: 'CRMUsers',
                localField: 'groups.tutor',
                foreignField: '_id',
                as: 'tutors'
            }
        }
    ];

    constructor(private readonly pivotTableDTO: StudentsPivotTableDTO) {}

    private static escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // eslint-disable-next-line sonarjs/cognitive-complexity
    build() {
        if (this.pivotTableDTO.names.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDTO.names.map(name => ({
                        name: new RegExp(
                            PipelineBuilder.escapeRegExp(name),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDTO.surnames.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDTO.surnames.map(surname => ({
                        surname: new RegExp(
                            PipelineBuilder.escapeRegExp(surname),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDTO.middleNames.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDTO.middleNames.map(middleName => ({
                        middleName: new RegExp(
                            PipelineBuilder.escapeRegExp(middleName),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDTO.genders.length !== 0) {
            this.pipeline.push({
                $match: { gender: { $in: this.pivotTableDTO.genders } }
            });
        }

        if (this.pivotTableDTO.ages.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDTO.ages.map(age => ({
                        dateOfBirth: {
                            $gt: new Date(
                                DateTime.now()
                                    .minus({ year: age + 1 })
                                    .plus({ day: 1 })
                                    .toISO()
                            ),
                            $lt: new Date(
                                DateTime.now().minus({ year: age }).toISO()
                            )
                        }
                    }))
                }
            });
        }

        if (this.pivotTableDTO.dateOfBirthIsNotDefined) {
            this.pipeline.push({
                $match: {
                    dateOfBirth: null
                }
            });
        } else {
            this.pipeline.push({
                $match: {
                    dateOfBirth: { $ne: null }
                }
            });
        }

        if (this.pivotTableDTO.phones.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDTO.phones.map(phone => ({
                        phone: new RegExp(
                            PipelineBuilder.escapeRegExp(phone),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDTO.parentPhones.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDTO.parentPhones.map(parentPhone => ({
                        parentPhone: new RegExp(
                            PipelineBuilder.escapeRegExp(parentPhone),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDTO.parentFullNames.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDTO.parentFullNames.map(
                        parentFullName => ({
                            parentFullName: new RegExp(
                                PipelineBuilder.escapeRegExp(parentFullName),
                                'i'
                            )
                        })
                    )
                }
            });
        }

        if (
            this.pivotTableDTO.debt === true ||
            this.pivotTableDTO.debt === false
        ) {
            this.pipeline.push({
                $match: {
                    balance:
                        this.pivotTableDTO.debt === true
                            ? { $lt: 0 }
                            : { $gte: 0 }
                }
            });
        }

        if (this.pivotTableDTO.discords.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDTO.discords.map(discord => ({
                        discord: new RegExp(
                            PipelineBuilder.escapeRegExp(discord),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDTO.salesFunnelSteps.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDTO.salesFunnelSteps.map(
                        salesFunnelStep => ({
                            salesFunnelStep: new RegExp(
                                PipelineBuilder.escapeRegExp(salesFunnelStep),
                                'i'
                            )
                        })
                    )
                }
            });
        }

        if (this.pivotTableDTO.statuses.length !== 0) {
            this.pipeline.push({
                $match: { statuses: { $all: this.pivotTableDTO.statuses } }
            });
        }

        if (this.pivotTableDTO.groups.length !== 0) {
            this.pipeline.push({
                $match: {
                    'groups._id': {
                        $in: this.pivotTableDTO.groups.map(
                            id => new Types.ObjectId(id)
                        )
                    }
                }
            });
        }

        if (this.pivotTableDTO.tutors.length !== 0) {
            this.pipeline.push({
                $match: {
                    'tutors._id': {
                        $in: this.pivotTableDTO.tutors.map(
                            id => new Types.ObjectId(id)
                        )
                    }
                }
            });
        }

        return this.pipeline;
    }
}
