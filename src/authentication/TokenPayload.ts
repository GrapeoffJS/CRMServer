import { AccountTypes } from '../admin-panel/crmaccounts/models/AccountTypes';
export type TokenPayload = {
    id: string;
    login: string;
    name: string;
    surname: string;
    midname: string;
    accountType: AccountTypes;
};
