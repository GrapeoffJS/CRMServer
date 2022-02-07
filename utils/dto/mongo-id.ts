import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class MongoId {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    id: string;
}
