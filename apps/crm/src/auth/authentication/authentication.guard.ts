import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const authenticationModule = await NestFactory.createApplicationContext(
            AuthenticationModule
        );

        const jwtService: JwtService =
            authenticationModule.get<JwtService>(JwtService);

        const request = context.switchToHttp().getRequest<Request>();

        if (
            request.url.indexOf('admin-panel') !== -1 ||
            request.url.indexOf('auth') !== -1
        ) {
            return true;
        }

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
