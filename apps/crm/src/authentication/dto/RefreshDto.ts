import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
    @ApiProperty()
    @IsJWT()
    refreshToken: string;
}
