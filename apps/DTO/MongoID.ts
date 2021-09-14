import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class MongoID {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    id: string;
}
