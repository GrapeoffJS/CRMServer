import { Client, ClientOptions } from '@elastic/elasticsearch';
import { DocumentType } from '@typegoose/typegoose';
import Pupil from '../crm/pupils/models/Pupil.model';
import { Group } from '../crm/groups/models/Group.model';
import CRMUser from '../../../admin-panel/src/crmaccounts/models/CRMUser.model';

export class SearchIndexer {
    private static _instance: SearchIndexer;
    private _client: Client;

    private constructor() {
    }

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

    public updateGroup(group: DocumentType<Group>): void {
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

    public deleteGroup(group: DocumentType<Group>): void {
        this._client.delete({ id: group.id, index: 'groups' });
    }

    public indexCRMUser(user: DocumentType<CRMUser>) {
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

    public updateCRMUser(user: DocumentType<CRMUser>) {
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

    public deleteCRMUser(user: DocumentType<CRMUser>) {
        this._client.delete({ id: user.id, index: 'crmusers' });
    }
}
