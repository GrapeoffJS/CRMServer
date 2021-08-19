import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtendedRequest } from 'src/authorization/ExtendedRequest';

@Injectable()
class DataPermissionsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const dataPermissions = context
            .switchToHttp()
            .getRequest<ExtendedRequest>().user.role.dataPermissions;

        context.switchToHttp().getRequest<ExtendedRequest>().dataPermissions =
            dataPermissions;

        return next.handle();
    }
}
