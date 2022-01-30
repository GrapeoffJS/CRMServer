import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    public constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext) {
        const isControllerPublic = this.reflector.get<boolean>(
            'isControllerPublic',
            context.getClass()
        );

        const isEndpointPublic = this.reflector.get<boolean>(
            'isEndpointPublic',
            context.getHandler()
        );

        if (isControllerPublic || isEndpointPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        try {
            await this.jwtService.verify(
                request.headers.authorization.split(' ')[1]
            );

            return true;
        } catch (e) {
            throw new UnauthorizedException(e);
        }
    }
}
