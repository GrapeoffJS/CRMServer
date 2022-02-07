import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Reflector } from '@nestjs/core';
// @ts-ignore
import { plainToInstance } from 'class-transformer';
import { RoleModel } from '../../../admin-panel/src/roles/models/role.model';
import { AuthorizedRequest } from './types/authorized-request';

@Injectable()
export class RightsBasedSerializerInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isControllerPublic = this.reflector.get<boolean>(
            'isControllerPublic',
            context.getClass()
        );

        const isEndpointPublic = this.reflector.get<boolean>(
            'isEndpointPublic',
            context.getHandler()
        );

        if (isEndpointPublic || isControllerPublic) {
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
