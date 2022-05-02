import { CrmUserModel } from '@apps/admin-panel/crmusers/models/crm-user.model';
import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';

export type AuthorizedRequest = Request & {
    user: DocumentType<CrmUserModel>;
};
