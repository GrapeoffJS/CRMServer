import { Request } from 'express';
import CRMUser from '../../../admin-panel/src/crmaccounts/models/CRMUser.model';
import { DocumentType } from '@typegoose/typegoose';

export interface ExtendedRequest extends Request {
    user: DocumentType<CRMUser>;
}
