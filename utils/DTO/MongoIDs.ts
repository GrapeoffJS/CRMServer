import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class MongoIDs {
    @IsNotEmpty()
    @IsString({ each: true })
    @IsMongoId({ each: true })
    ids: string[];
}
