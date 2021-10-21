import { ConfigModuleOptions } from '@nestjs/config';

export default {
    cache: true,
    envFilePath: '.env'
} as ConfigModuleOptions;
