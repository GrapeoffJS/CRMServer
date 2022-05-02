import { Type } from 'class-transformer';

import { GroupModel } from '../models/group.model';

export class PaginatedResponseDto {
    count: number;

    @Type(() => GroupModel)
    docs: GroupModel[];
}
