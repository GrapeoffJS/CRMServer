import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDTO {
    @ApiProperty()
    @IsJWT()
    refreshToken: string;
}
