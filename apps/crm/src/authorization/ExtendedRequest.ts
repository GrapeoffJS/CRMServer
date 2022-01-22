import { Request } from 'express';
import { CRMUserModel } from '../../../admin-panel/src/crmusers/models/CRMUser.model';
import { DocumentType } from '@typegoose/typegoose';

export interface ExtendedRequest extends Request {
    user: DocumentType<CRMUserModel>;
}
