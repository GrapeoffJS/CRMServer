import { Transform, Type } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class TagsFilterDto {
    @IsOptional()
    @Type(() => String)
    @Transform(prop => prop.value?.split(','))
    @IsMongoId({ each: true })
    tags: string[];
}
