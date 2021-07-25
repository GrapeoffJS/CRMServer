import Pupil from '../pupils/models/Pupil.model';
import { Group } from '../groups/models/Group.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { sortBy } from 'lodash';

@Injectable()
export class SearchService {
    constructor(
        @InjectModel(Group)
        private readonly GroupModel: ReturnModelType<typeof Group>,
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    async searchAutocompletion(query: string) {
        const foundPupils = await this.PupilModel.find(
            {
                $text: { $search: query, $caseSensitive: false }
            },
            {
                name: '$name',
                surname: '$surname',
                midname: '$midname',
                score: { $meta: 'textScore' },
                type: 'pupil'
            }
        ).limit(6);

        const foundGroups = await this.GroupModel.find(
            {
                $text: { $search: query, $caseSensitive: false }
            },
            {
                name: '$GROUP_NAME',
                score: { $meta: 'textScore' },
                type: 'group'
            }
        ).limit(6);

        const searchResult = sortBy(
            [...foundPupils, ...foundGroups],
            ['_doc.score']
        ).reverse();

        return searchResult;
    }

    async fullSearch(query: string) {
        const foundPupils = await this.PupilModel.find(
            {
                $text: { $search: query, $caseSensitive: false }
            },
            {
                name: '$name',
                surname: '$surname',
                midname: '$midname',
                score: { $meta: 'textScore' },
                type: 'pupil'
            }
        );

        const foundGroups = await this.GroupModel.find(
            {
                $text: { $search: query, $caseSensitive: false }
            },
            {
                name: '$GROUP_NAME',
                score: { $meta: 'textScore' },
                type: 'group'
            }
        );

        const searchResult = sortBy(
            [...foundGroups, ...foundPupils],
            ['_doc.score']
        ).reverse();

        return searchResult;
    }
}
