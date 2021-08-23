import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from '../../../crmserver/src/authorization/ExtendedRequest';
import { Role } from './models/Role.model';

export const GetDataPermissions = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const user = context.switchToHttp().getRequest<ExtendedRequest>().user;

        return (user.role as Role).dataPermissions || user.localDataPermissions;
    }
);
