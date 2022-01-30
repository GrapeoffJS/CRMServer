import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './DTO/AuthDTO';
import { RefreshDTO } from './DTO/RefreshDTO';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PublicController } from './authentication/PublicController';

@ApiTags('Authorization')
@PublicController()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiBody({ type: () => AuthDTO })
    @Post()
    async auth(@Body() authDTO: AuthDTO) {
        return await this.authService.auth(authDTO);
    }

    @ApiBody({ type: () => RefreshDTO })
    @Post('/refresh')
    async refresh(@Body() refreshDTO: RefreshDTO) {
        return await this.authService.refresh(refreshDTO);
    }
}
