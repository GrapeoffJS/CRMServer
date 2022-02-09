import { SetMetadata } from '@nestjs/common';

/***
 * Telling RightBasedSerializerInterceptor what data type we use for transformation
 * @param model Any type we want to cast the response to
 */
export const SetResponseTransformationType = (model: any) =>
    SetMetadata('transformation-type', model);
