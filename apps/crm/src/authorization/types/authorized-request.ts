import { CrmUserModel } from '../../../../admin-panel/src/crmusers/models/crm-user.model';
import { Request } from 'express';
import { DocumentType } from '@typegoose/typegoose';

export type AuthorizedRequest = Request & {
    user: DocumentType<CrmUserModel>;
};
