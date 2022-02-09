import { SetMetadata } from '@nestjs/common';

export const PermissionsNotNeeded = () =>
    SetMetadata('permissions-not-needed', true);
