import { ConfigModuleOptions } from '@nestjs/config';

export default {
    cache: true,
    envFilePath: process.env.NODE_ENV + '.env'
} as ConfigModuleOptions;
