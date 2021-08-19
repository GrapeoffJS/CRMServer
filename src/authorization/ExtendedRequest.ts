import { Request } from 'express';
import CRMUser from '../admin-panel/crmaccounts/models/CRMUser.model';
import { DocumentType } from '@typegoose/typegoose';
import { DataPermissions } from '../admin-panel/roles/models/DataPermissions';

export type ExtendedRequest = Request & {
    user: DocumentType<CRMUser>;
    dataPermissions: DataPermissions[];
};
