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
import { JwtService } from '@nestjs/jwt';
import { CRMUserModel } from '../../../admin-panel/src/crmusers/models/CRMUser.model';
import { Request } from 'express';
import { RoleModel } from '../../../admin-panel/src/roles/models/Role.model';

@Injectable()
export class RightsBasedSerializerInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

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

        const tokenPayload = this.jwtService.verify<CRMUserModel>(
            context
                .switchToHttp()
                .getRequest<Request>()
                .headers.authorization.split(' ')[1]
        );

        const userDataRights = (tokenPayload.role as RoleModel).dataRights;

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
