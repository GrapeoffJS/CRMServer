import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtendedRequest } from '../authorization/ExtendedRequest';
import { ActionPermissions } from '../admin-panel/crmaccounts/models/Permissions';

export const PermissionGuard = (requiredPermission: ActionPermissions) => {
    class PermissionsGuardMixin implements CanActivate {
        canActivate(
            context: ExecutionContext
        ): boolean | Promise<boolean> | Observable<boolean> {
            const permissions = context
                .switchToHttp()
                .getRequest<ExtendedRequest>().user.permissions;

            if (!permissions.includes(requiredPermission)) {
                return false;
            }

            return true;
        }
    }

    return mixin(PermissionsGuardMixin);
};
