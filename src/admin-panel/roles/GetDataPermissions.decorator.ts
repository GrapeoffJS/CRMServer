import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from '../../authorization/ExtendedRequest';
import { Role } from './models/Role.model';

export const GetDataPermissions = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const role = context.switchToHttp().getRequest<ExtendedRequest>().user
            .role as Role;

        return role.dataPermissions;
    }
);
