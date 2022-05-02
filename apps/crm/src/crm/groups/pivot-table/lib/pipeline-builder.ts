import { PipelineStage, Types } from 'mongoose';

import { GroupsPivotTableDto } from '../dto/groups-pivot-table.dto';

export class PipelineBuilder {
    private pipeline: PipelineStage[] = [
        { $addFields: { studentsCount: { $size: '$students' } } },
        {
            $lookup: {
                from: 'Students',
                as: 'students',
                localField: 'students',
                foreignField: '_id'
            }
        },
        {
            $lookup: {
                from: 'CRMUsers',
                as: 'tutor',
                localField: 'tutor',
                foreignField: '_id'
            }
        }
    ];

    constructor(private readonly pivotTableDto: GroupsPivotTableDto) {}

    build() {
        if (this.pivotTableDto.names.length !== 0) {
            this.pipeline.push({
                $match: {
                    $or: this.pivotTableDto.names.map(item => ({
                        name: new RegExp(
                            item
                                .toString()
                                .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                            'i'
                        )
                    }))
                }
            });
        }

        if (this.pivotTableDto.levels.length !== 0) {
            this.pipeline.push({
                $match: {
                    level: { $in: this.pivotTableDto.levels }
                }
            });
        }

        if (this.pivotTableDto.filled) {
            this.pipeline.push({
                $match: { $expr: { $eq: ['$studentsCount', '$places'] } }
            });
        }

        if (this.pivotTableDto.students.length !== 0) {
            this.pipeline.push({
                $match: {
                    'students._id': {
                        $all: this.pivotTableDto.students.map(
                            id => new Types.ObjectId(id)
                        )
                    }
                }
            });
        }

        if (this.pivotTableDto.tutors.length !== 0) {
            this.pipeline.push({
                $match: {
                    'tutor._id': {
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
