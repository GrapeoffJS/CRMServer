import { Module } from '@nestjs/common';
import { CurrentUserTasksController } from './current-user-tasks.controller';
import { CurrentUserTasksService } from './current-user-tasks.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { Task } from '../models/Task.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Task,
                schemaOptions: { collection: 'Tasks' }
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_LIFETIME')
                    }
                };
            }
        })
    ],
    controllers: [CurrentUserTasksController],
    providers: [CurrentUserTasksService]
})
export class CurrentUserTasksModule {}
