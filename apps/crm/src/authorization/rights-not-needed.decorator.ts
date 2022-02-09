import { SetMetadata } from '@nestjs/common';

export const RightsNotNeeded = () =>
    SetMetadata('permissions-not-needed', true);
