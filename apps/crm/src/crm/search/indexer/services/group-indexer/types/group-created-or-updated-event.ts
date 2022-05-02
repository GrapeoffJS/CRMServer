type Payload = {
    id: string;
    name: string;
};

export class GroupCreatedOrUpdatedEvent {
    constructor(eventPayload: Payload) {
        this.id = eventPayload.id;
        this.name = eventPayload.name;
    }

    public readonly id: string;
    public readonly name: string;
}
