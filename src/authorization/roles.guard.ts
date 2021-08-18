import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Roles } from '../admin-panel/crmaccounts/models/Roles';
import { TokenPayload } from 'src/authentication/TokenPayload';
import { decode } from 'jsonwebtoken';

export const RolesGuard = (...allowedRoles: Roles[]) => {
    class RolesGuardMixin implements CanActivate {
        canActivate(
            context: ExecutionContext
        ): boolean | Promise<boolean> | Observable<boolean> {
            const token = context
                .switchToHttp()
                .getRequest<Request>()
                .headers.authorization.split(' ')[1];

            const { role } = decode(token) as TokenPayload;

            if (!allowedRoles.includes(role)) {
                return false;
            }

            return true;
        }
    }

    return mixin(RolesGuardMixin);
};
