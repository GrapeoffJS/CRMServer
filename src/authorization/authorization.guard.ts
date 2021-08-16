import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TokenPayload } from '../authentication/TokenPayload';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private readonly JwtService: JwtService) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        let canActivate = true;

        const token = context
            .switchToHttp()
            .getRequest<Request>()
            .headers.authorization.split(' ')[1];

        try {
            this.JwtService.verify<TokenPayload>(token);
        } catch (err) {
            canActivate = false;
        }

        return canActivate;
    }
}
