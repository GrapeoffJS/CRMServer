import { Roles } from '../admin-panel/crmaccounts/models/Roles';
export type TokenPayload = {
    id: string;
    name: string;
    surname: string;
    midname: string;
    role: Roles;
};
