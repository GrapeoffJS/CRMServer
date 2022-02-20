import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshDto {
    @ApiProperty({ required: true })
    @IsJWT()
    refreshToken: string;
}
