import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from '../../authorization/ExtendedRequest';

export const GetDataPermissions = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        return context.switchToHttp().getRequest<ExtendedRequest>().user.role
            .dataPermissions;
    }
);
