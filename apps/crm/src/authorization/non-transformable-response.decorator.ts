import { SetMetadata } from '@nestjs/common';

/**
 * Controllers or endpoints which marked with this decorator won't participate in response transformation pipeline
 */
export const NonTransformableResponse = () =>
    SetMetadata('isTransformable', false);
