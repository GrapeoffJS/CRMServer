import { AccountTypes } from '../../../../admin-panel/src/crmusers/types/AccountTypes';

export type TokenPayload = {
    id: string;
    login: string;
    name: string;
    surname: string;
    midname: string;
    accountType: AccountTypes;
};
