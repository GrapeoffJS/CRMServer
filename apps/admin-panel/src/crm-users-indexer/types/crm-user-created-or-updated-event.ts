type Payload = {
    id: string;
    name: string;
    surname: string;
    middleName: string;
    accountType: AccountTypes;
};

export enum AccountTypes {
    ADMIN = 'admin',
    MANAGER = 'manager',
    PARTNER = 'partner',
    SENIOR_TUTOR = 'senior-tutor',
    SUPPORTER = 'supporter',
    TUTOR = 'tutor'
}

export class CrmUserCreatedOrUpdatedEvent {
    constructor(eventPayload: Payload) {
        this.accountType = eventPayload.accountType;
        this.id = eventPayload.id;
        this.name = eventPayload.name;
        this.surname = eventPayload.surname;
        this.middleName = eventPayload.middleName;
    }

    public readonly accountType: AccountTypes;
    public readonly id: string;
    public readonly name: string;
    public readonly surname: string;
    public readonly middleName: string;
}
