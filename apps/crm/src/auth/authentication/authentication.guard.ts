import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NestFactory, Reflector } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    public constructor(private readonly reflector: Reflector) {}

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

        const authenticationModule = await NestFactory.createApplicationContext(
            AuthenticationModule
        );

        const jwtService: JwtService =
            authenticationModule.get<JwtService>(JwtService);

        try {
            await jwtService.verify(
                request.headers.authorization.split(' ')[1]
            );

            return true;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
