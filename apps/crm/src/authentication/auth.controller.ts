import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/AuthDto';
import { RefreshDto } from './dto/RefreshDto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PublicController } from '../authorization/public-controller.decorator';

@ApiTags('Authorization')
@PublicController()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiBody({ type: () => AuthDto })
    @Post()
    async auth(@Body() authDto: AuthDto) {
        return await this.authService.auth(authDto);
    }

    @ApiBody({ type: () => RefreshDto })
    @Post('/refresh')
    async refresh(@Body() refreshDto: RefreshDto) {
        return await this.authService.refresh(refreshDto);
    }
}
