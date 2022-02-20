import { RoleModel } from '@apps/admin-panel/roles/models/role.model';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// @ts-ignore
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

import { AuthorizedRequest } from './types/authorized-request';

@Injectable()
export class RightsBasedSerializerInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getClass(),
            context.getHandler()
        ]);

        const skipResponseTransformation =
            this.reflector.getAllAndOverride<boolean>(
                'skip-response-transformation',
                [context.getClass(), context.getHandler()]
            );

        if (isPublic || skipResponseTransformation) {
            return next.handle();
        }

        const userDataRights = (
            context.switchToHttp().getRequest<AuthorizedRequest>().user
                .role as RoleModel
        ).dataRights;

        const transformationType = this.reflector.get(
            'transformation-type',
            context.getHandler()
        );

        return next.handle().pipe(
            map(data =>
                plainToInstance(transformationType, data, {
                    groups: userDataRights
                })
            )
        );
    }
}
