import { Client, ClientOptions } from '@elastic/elasticsearch';
import { DocumentType } from '@typegoose/typegoose';
import Pupil from '../crm/pupils/models/Pupil.model';
import { Group } from '../crm/groups/models/Group.model';

export class SearchIndexer {
    private static _instance: SearchIndexer;
    private _client: Client;

    static getInstance(): SearchIndexer {
        if (!SearchIndexer._instance) {
            SearchIndexer._instance = new SearchIndexer();
            return SearchIndexer._instance;
        }

        return SearchIndexer._instance;
    }

    connect(connectionOptions: ClientOptions): void {
        this._client = new Client(connectionOptions);
    }

    indexPupil(pupil: DocumentType<Pupil>): void {
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

    updatePupil(pupil: DocumentType<Pupil>): void {
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

    deletePupil(pupil: DocumentType<Pupil>): void {
        this._client.delete({ id: pupil.id, index: 'pupils' });
    }

    indexGroup(group: DocumentType<Group>): void {
        this._client.index({
            index: 'groups',
            id: group.id,
            body: {
                type: 'group',
                id: group.id,
                group_name: group.group_name,
                tutor: group.tutor
            }
        });
    }

    updateGroup(group: DocumentType<Group>): void {
        this._client.update({
            id: group.id,
            index: 'groups',
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

    deleteGroup(group: DocumentType<Group>): void {
        this._client.delete({ id: group.id, index: 'groups' });
    }

    indexCRMUser(user) {
        this._client.index({
            id: user.id,
            index: 'crmusers',
            body: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                midname: user.midname,
                accountType: user.accountType
            }
        });
    }

    updateCRMUser(user) {
        this._client.index({
            id: user.id,
            index: 'crmusers',
            body: {
                doc: {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    midname: user.midname,
                    accountType: user.accountType
                }
            }
        });
    }

    deleteCRMUser(user) {
        this._client.delete({ id: user.id, index: 'crmusers' });
    }
}