import Pupil from 'src/crm/pupils/models/Pupil.model';
import { DocumentType } from '@typegoose/typegoose';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Group } from 'src/crm/groups/models/Group.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchIndexerService {
    constructor(private readonly esService: ElasticsearchService) {}

    async createPupilIndex(pupil: DocumentType<Pupil>) {
        await this.esService.index({
            id: pupil.id,
            index: 'pupils',
            body: {
                type: 'pupil',
                id: pupil.id,
                name: pupil.name,
                surname: pupil.surname,
                midname: pupil.midname,
                parentNSM: pupil.parentNSM,
                phone: pupil.parentPhone,
                parentPhone: pupil.parentPhone
            }
        });
    }

    async updatePupilIndex(pupil: DocumentType<Pupil>) {
        await this.esService.update({
            id: pupil.id,
            index: 'pupils',
            body: {
                type: 'pupil',
                id: pupil.id,
                name: pupil.name,
                surname: pupil.surname,
                midname: pupil.midname,
                parentNSM: pupil.parentNSM,
                phone: pupil.parentPhone,
                parentPhone: pupil.parentPhone
            }
        });
    }

    async createGroupIndex(group: DocumentType<Group>) {
        await this.esService.index({
            id: group.id,
            index: 'groups',
            body: {
                type: 'group',
                id: group.id,
                GROUP_NAME: group.GROUP_NAME
            }
        });
    }

    async updateGroupIndex(group: DocumentType<Group>) {
        await this.esService.index({
            id: group.id,
            index: 'groups',
            body: {
                type: 'group',
                id: group.id,
                GROUP_NAME: group.GROUP_NAME
            }
        });
    }

    async searchEverywhere(query: string) {}
}
