import { SetMetadata } from '@nestjs/common';

/**
 * Controllers or endpoints which marked with this decorator won't require action rights
 */
export const RightsNotNeeded = () => SetMetadata('rights-not-needed', true);
