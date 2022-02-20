import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ActionRights } from '../rights/action-rights';
import { DataRights } from '../rights/data-rights';

export class CreateRoleDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ enum: ActionRights, isArray: true, required: true })
    @IsEnum(ActionRights, { each: true })
    @ArrayUnique()
    actionRights: string[];

    @ApiProperty({ enum: DataRights, isArray: true, required: true })
    @IsEnum(DataRights, { each: true })
    @ArrayUnique()
    dataRights: string[];
}
