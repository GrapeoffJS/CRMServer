import { Client, ClientOptions } from '@elastic/elasticsearch';
import { DocumentType } from '@typegoose/typegoose';
import Pupil from '../crm/pupils/models/Pupil.model';
import { Group } from '../crm/groups/models/Group.model';

export class SearchIndexer {
    private static _instance: SearchIndexer;
    private _client: Client;

    private constructor() {}

    public static getInstance(): SearchIndexer {
        if (!SearchIndexer._instance) {
            SearchIndexer._instance = new SearchIndexer();
            return SearchIndexer._instance;
        }

        return SearchIndexer._instance;
    }

    public connect(connectionOptions: ClientOptions): void {
        this._client = new Client(connectionOptions);
    }

    public indexPupil(pupil: DocumentType<Pupil>): void {
        this._client.index({
            index: 'pupils',
            id: pupil.id,
            body: {
                type: 'pupil',
                id: pupil.id,
                name: pupil.name,
                surname: pupil.surname,
                midname: pupil.midname,
                parentFullname: pupil.parentFullname,
                phone: pupil.phone,
                parentPhone: pupil.parentPhone,
                tutors: pupil.tutors
            }
        });
    }

    public updatePupil(pupil: DocumentType<Pupil>): void {
        this._client.update({
            id: pupil.id,
            index: 'pupils',
            body: {
                doc: {
                    type: 'pupil',
                    id: pupil.id,
                    name: pupil.name,
                    surname: pupil.surname,
                    midname: pupil.midname,
                    parentFullname: pupil.parentFullname,
                    phone: pupil.phone,
                    parentPhone: pupil.parentPhone,
                    tutors: pupil.tutors
                }
            }
        });
    }

    public deletePupil(pupil: DocumentType<Pupil>): void {
        this._client.delete({ id: pupil.id, index: 'pupils' });
    }

    public indexGroup(group: DocumentType<Group>): void {
        this._client.index({
            index: 'pupils',
            id: group.id,
            body: {
                type: 'group',
                id: group.id,
                group_name: group.group_name,
                tutor: group.tutor
            }
        });
    }

    public updateGroup(group: DocumentType<Group>): void {
        this._client.update({
            id: group.id,
            index: 'pupils',
            body: {
                doc: {
                    type: 'group',
                    id: group.id,
                    group_name: group.group_name,
                    tutor: group.tutor
                }
            }
        });
    }

    public deleteGroup(group: DocumentType<Group>): void {
        this._client.delete({ id: group.id, index: 'groups' });
    }
}
