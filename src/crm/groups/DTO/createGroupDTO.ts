import { ApiProperty } from '@nestjs/swagger';

export class createGroupDTO {
    GROUP_NAME: string;
    LEVEL: number;
    PLACES: number;
    PUPILS: string[];
    TUTOR: string | null;
}
