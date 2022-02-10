import { SetMetadata } from '@nestjs/common';

/**
 * Controllers or endpoints which marked with this decorator won't require authorization
 */
export const Public = () => SetMetadata('isPublic', true);
