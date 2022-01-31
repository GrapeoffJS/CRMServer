import { ArrayUnique, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ActionRights } from '../rights/ActionRights';
import { DataRights } from '../rights/DataRights';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ enum: ActionRights, isArray: true })
    @IsEnum(ActionRights, { each: true })
    @ArrayUnique()
    actionRights: string[];

    @ApiProperty({ enum: DataRights, isArray: true })
    @IsEnum(DataRights, { each: true })
    @ArrayUnique()
    dataRights: string[];
}
