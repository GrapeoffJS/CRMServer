import { SetMetadata } from '@nestjs/common';

export const PublicController = () => SetMetadata('isControllerPublic', true);
