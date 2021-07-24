import { CanActivate } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        let canActivate: boolean = true;

        const token = context.switchToHttp().getRequest<Request>()
            .headers?.authorization;

        if (!token) {
            canActivate = false;
        }

        verify(
            token?.split(' ')[1] || null,
            this.configService.get('JWT_SECRET'),
            async (err, decoded) => {
                if (err) {
                    canActivate = false;
                }
            }
        );

        return canActivate;
    }
}
