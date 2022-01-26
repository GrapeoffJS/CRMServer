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

        try {
            await jwtService.verify(
                context
                    .switchToHttp()
                    .getRequest<Request>()
                    .headers.authorization.split(' ')[1]
            );

            return true;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
