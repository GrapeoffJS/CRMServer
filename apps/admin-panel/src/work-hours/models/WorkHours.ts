import { ApiProperty } from '@nestjs/swagger';

class WorkHour {
    @ApiProperty()
    Mo: boolean;

    @ApiProperty()
    Tu: boolean;
    @ApiProperty()
    We: boolean;

    @ApiProperty()
    Th: boolean;

    @ApiProperty()
    Fr: boolean;

    @ApiProperty()
    Sa: boolean;

    @ApiProperty()
    Su: boolean;
}

export class WorkHours {
    @ApiProperty()
    hour10: WorkHour;

    @ApiProperty()
    hour11: WorkHour;

    @ApiProperty()
    hour12: WorkHour;

    @ApiProperty()
    hour13: WorkHour;

    @ApiProperty()
    hour14: WorkHour;

    @ApiProperty()
    hour15: WorkHour;

    @ApiProperty()
    hour16: WorkHour;

    @ApiProperty()
    hour17: WorkHour;

    @ApiProperty()
    hour18: WorkHour;

    @ApiProperty()
    hour19: WorkHour;
}
