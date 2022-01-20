import { Request } from 'express';
import { CRMUser } from '../../../admin-panel/src/crmusers/models/CRMUser.model';
import { DocumentType } from '@typegoose/typegoose';

export interface ExtendedRequest extends Request {
    user: DocumentType<CRMUser>;
}
