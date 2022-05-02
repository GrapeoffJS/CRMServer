type Payload = {
    id: string;
    name: string;
    surname: string;
    middleName: string;
    phone: string;
    parentPhone: string;
    discord: string;
};

export class StudentCreatedOrUpdatedEvent {
    constructor(eventPayload: Payload) {
        this.id = eventPayload.id;
        this.name = eventPayload.name;
        this.surname = eventPayload.surname;
        this.middleName = eventPayload.middleName;
        this.phone = eventPayload.phone;
        this.parentPhone = eventPayload.parentPhone;
        this.discord = eventPayload.discord;
    }

    public readonly id: string;
    public readonly name: string;
    public readonly surname: string;
    public readonly middleName: string;
    public readonly phone: string;
    public readonly parentPhone: string;
    public readonly discord: string;
}
