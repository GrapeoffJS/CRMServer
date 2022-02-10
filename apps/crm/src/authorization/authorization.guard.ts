import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthorizedRequest } from './types/authorized-request';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    public constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getClass(),
            context.getHandler()
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        try {
            await this.jwtService.verify(
                request.headers.authorization.split(' ')[1]
            );

            context.switchToHttp().getRequest<AuthorizedRequest>().user =
                await this.jwtService.verify(
                    request.headers.authorization.split(' ')[1]
                );

            return true;
        } catch (e) {
            throw new UnauthorizedException(e);
        }
    }
}
