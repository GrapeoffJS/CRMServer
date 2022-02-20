import { DateTime } from 'luxon';
import { PipelineStage, Types } from 'mongoose';

import { StudentsPivotTableDto } from '../dto/students-pivot-table.dto';

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

    constructor(private readonly pivotTableDto: StudentsPivotTableDto) {}

    private static escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // eslint-disable-next-line sonarjs/cognitive-complexity
    build() {
        if (this.pivotTableDto.names.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.names.map(name => ({
                        name: new RegExp(
                            PipelineBuilder.escapeRegExp(name),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDto.surnames.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.surnames.map(surname => ({
                        surname: new RegExp(
                            PipelineBuilder.escapeRegExp(surname),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDto.middleNames.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.middleNames.map(middleName => ({
                        middleName: new RegExp(
                            PipelineBuilder.escapeRegExp(middleName),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDto.genders.length !== 0) {
            this.pipeline.push({
                $match: { gender: { $in: this.pivotTableDto.genders } }
            });
        }

        if (this.pivotTableDto.ages.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.ages.map(age => ({
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

        if (this.pivotTableDto.dateOfBirthIsNotDefined) {
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

        if (this.pivotTableDto.phones.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.phones.map(phone => ({
                        phone: new RegExp(
                            PipelineBuilder.escapeRegExp(phone),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDto.parentPhones.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.parentPhones.map(parentPhone => ({
                        parentPhone: new RegExp(
                            PipelineBuilder.escapeRegExp(parentPhone),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDto.parentFullNames.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.parentFullNames.map(
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
            this.pivotTableDto.debt === true ||
            this.pivotTableDto.debt === false
        ) {
            this.pipeline.push({
                $match: {
                    balance:
                        this.pivotTableDto.debt === true
                            ? { $lt: 0 }
                            : { $gte: 0 }
                }
            });
        }

        if (this.pivotTableDto.discords.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.discords.map(discord => ({
                        discord: new RegExp(
                            PipelineBuilder.escapeRegExp(discord),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDto.salesFunnelSteps.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.salesFunnelSteps.map(
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

        if (this.pivotTableDto.statuses.length !== 0) {
            this.pipeline.push({
                $match: { statuses: { $all: this.pivotTableDto.statuses } }
            });
        }

        if (this.pivotTableDto.groups.length !== 0) {
            this.pipeline.push({
                $match: {
                    'groups._id': {
                        $in: this.pivotTableDto.groups.map(
                            id => new Types.ObjectId(id)
                        )
                    }
                }
            });
        }

        if (this.pivotTableDto.tutors.length !== 0) {
            this.pipeline.push({
                $match: {
                    'tutors._id': {
                        $in: this.pivotTableDto.tutors.map(
                            id => new Types.ObjectId(id)
                        )
                    }
                }
            });
        }

        return this.pipeline;
    }
}
