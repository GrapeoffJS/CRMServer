import { SetMetadata } from '@nestjs/common';

/***
 * Telling RightBasedSerializerInterceptor what data type we use for transformation
 * @param model Any model that we want to transform
 */
export const SetTransformationType = (model: any) =>
    SetMetadata('transformation-type', model);
