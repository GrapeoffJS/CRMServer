import { Request } from 'express';
import CRMUser from '../../../admin-panel/src/crmaccounts/models/CRMUser.model';
import { DocumentType } from '@typegoose/typegoose';

export type ExtendedRequest = Request & {
    user: DocumentType<CRMUser>;
};
