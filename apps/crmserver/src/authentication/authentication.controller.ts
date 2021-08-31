import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationDTO } from './DTO/AuthenticationDTO';
import { AuthenticationService } from './authentication.service';

@Controller('/auth')
export class AuthenticationController {
    constructor(
        private readonly AuthenticationService: AuthenticationService
    ) {}

    @Post()
    public async authenticate(@Body() authDTO: AuthenticationDTO) {
        return await this.AuthenticationService.authenticate(
            authDTO.login,
            authDTO.password
        );
    }
}
