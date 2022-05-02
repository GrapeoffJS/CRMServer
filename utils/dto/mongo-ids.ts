import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MongoIds {
    @ApiProperty()
    @IsMongoId({ each: true })
    ids: string[];
}
