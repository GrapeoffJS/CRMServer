import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
    @ApiProperty({ required: true })
    @IsJWT()
    refreshToken: string;
}
