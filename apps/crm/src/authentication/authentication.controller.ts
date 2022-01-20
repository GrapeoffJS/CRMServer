import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationDTO } from './DTO/AuthenticationDTO';
import { AuthenticationService } from './authentication.service';

@Controller('/auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Post()
    async authenticate(@Body() { login, password }: AuthenticationDTO) {
        return await this.authenticationService.authenticate(login, password);
    }
}
