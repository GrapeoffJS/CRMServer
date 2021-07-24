import { ApiProperty } from '@nestjs/swagger';

export class createSubscriptionDTO {
    name: string;
    price: number;
    houseCount: number;
}
